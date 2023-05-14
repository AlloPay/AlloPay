import { TypeSet } from '~/edgeql-js/reflection';
import e from '~/edgeql-js';
import { isTruthy } from 'lib';
import { orScalarLiteral } from '~/edgeql-js/castMaps';
import { $bool } from '~/edgeql-js/modules/std';

export const and = (<Op extends orScalarLiteral<TypeSet<$bool>>>() => {
  const chain = (ops: Op[]) => {
    if (ops.length === 0) return undefined;
    if (ops.length === 1) return ops[0];

    return e.op(ops[0], 'and', chain(ops.slice(1)));
  };

  return (...ops: (Op | undefined)[]) => chain(ops.filter(isTruthy));
})();

export const or = (<Op extends orScalarLiteral<TypeSet<$bool>>>() => {
  const chain = (ops: Op[]) => {
    if (ops.length === 0) return undefined;
    if (ops.length === 1) return ops[0];

    return e.op(ops[0], 'or', chain(ops.slice(1)));
  };

  return (...ops: (Op | undefined)[]) => chain(ops.filter(isTruthy));
})();
