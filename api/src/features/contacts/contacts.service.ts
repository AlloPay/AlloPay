import { Injectable } from '@nestjs/common';
import { Address } from 'lib';
import { ShapeFunc } from '../database/database.select';
import { DatabaseService } from '../database/database.service';
import e from '~/edgeql-js';
import { ContactsInput, UpsertContactInput } from './contacts.input';
import { uuid } from 'edgedb/dist/codecs/ifaces';
import { isAddress } from 'ethers/lib/utils';
import { or } from '../database/database.util';

type UniqueContact = uuid | Address;

export const uniqueContact = (u: UniqueContact) =>
  e.shape(e.Contact, () => ({
    filter_single: isAddress(u) ? { user: e.global.current_user, address: u } : { id: u },
  }));

@Injectable()
export class ContactsService {
  constructor(private db: DatabaseService) {}

  async selectUnique(id: UniqueContact, shape?: ShapeFunc<typeof e.Contact>) {
    return e
      .select(e.Contact, (c) => ({
        ...shape?.(c),
        ...uniqueContact(id)(c),
      }))
      .run(this.db.client);
  }

  async select({ query }: ContactsInput, shape?: ShapeFunc<typeof e.Contact>) {
    return e
      .select(e.Contact, (c) => ({
        ...shape?.(c),
        filter: query
          ? or(e.op(c.address, 'ilike', query), e.op(c.label, 'ilike', query))
          : undefined,
      }))
      .run(this.db.client);
  }

  async upsert({ previousAddress, address, label }: UpsertContactInput) {
    // Ignore leading and trailing whitespace
    label = label.trim();

    // UNLESS CONFLICT ON can only be used on a single property, so (= newAddress OR = previousAddress) nor a simple upsert is  possible
    if (previousAddress && previousAddress !== address) {
      const id = await this.db.query(
        e.update(e.Contact, (c) => ({
          ...uniqueContact(previousAddress)(c),
          set: {
            address,
            name: label,
          },
        })).id,
      );

      if (id) return id;
    }

    return this.db.query(
      e
        .insert(e.Contact, {
          address,
          label,
        })
        .unlessConflict((c) => ({
          on: e.tuple([c.user, c.address]),
          else: e.update(c, () => ({ set: { label } })),
        })).id,
    );
  }

  async delete(address: Address) {
    return this.db.query(e.delete(e.Contact, uniqueContact(address)).id);
  }

  async label(address: Address) {
    const contact = e.select(e.Contact, () => ({
      filter_single: { user: e.global.current_user, address },
      label: true,
    })).label;

    const account = e.select(e.Account, () => ({
      filter_single: { address },
      name: true,
    })).name;

    const approver = e.select(e.Approver, () => ({
      filter_single: { address },
      label: true,
    })).label;

    return this.db.query(e.select(e.op(e.op(contact, '??', account), '??', approver)));
  }
}
