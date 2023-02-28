import {
  INestApplication,
  INestMicroservice,
  Injectable,
  OnModuleInit,
  Optional,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { getUser } from '~/request/ctx';
import { loggingMiddleware } from './prisma.logging';

const getUserClient = (prisma: PrismaClient) =>
  prisma.$extends({
    name: 'UserClient',
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          const user = getUser();
          const accounts = [...user.accounts].map((a) => `'${a}'`).join(',');

          const [, , , response] = await prisma.$transaction([
            prisma.$queryRaw`SET LOCAL ROLE "user"`,
            prisma.$queryRaw`SELECT set_config('user.id', ${user.id}, true)`,
            prisma.$queryRawUnsafe(
              `SELECT set_config('user.accounts', ARRAY[${accounts}]::text[]::text, true)`,
            ),
            query(args),
          ]);

          return response;
        },
      },
    },
  });

@Injectable()
export class PrismaService<T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions>
  implements OnModuleInit
{
  readonly asSuperuser: PrismaClient<T>;
  readonly asUser: ReturnType<typeof getUserClient>;

  constructor(@Optional() options?: Prisma.Subset<T, Prisma.PrismaClientOptions>) {
    this.asSuperuser = new PrismaClient(options);
    this.asSuperuser.$use(loggingMiddleware());

    this.asUser = getUserClient(this.asSuperuser);
  }
  async onModuleInit() {
    await this.setUserPermission();
  }

  enableShutdownHooks(app: INestApplication | INestMicroservice) {
    this.asSuperuser.$on('beforeExit', () => app.close());
  }

  $transactionAsUser<R>(
    tx: Prisma.TransactionClient | undefined,
    f: (prisma: Prisma.TransactionClient) => Promise<R>,
  ) {
    return tx ? f(tx) : this.asUser.$transaction((tx) => f(tx));
  }

  private async setUserPermission() {
    const [{ current_user: currentUser }] = (await this.asSuperuser
      .$queryRaw`SELECT current_user`) as [{ current_user: string }];

    await this.asSuperuser.$queryRawUnsafe(`GRANT "user" TO "${currentUser}"`);
  }
}
