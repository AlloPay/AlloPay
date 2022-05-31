import { DateTime } from 'luxon';
import { useMemo } from 'react';

export interface TimestampProps {
  children: DateTime | number;
}

export const Timestamp = ({ children }: TimestampProps) => {
  const dt = useMemo(
    () =>
      typeof children === 'number' ? DateTime.fromSeconds(children) : children,
    [children],
  );

  const formatted = useMemo(
    () =>
      // dt.toFormat(`ccc d LLL${dt.year !== DateTime.now().year ? ' yy' : ''}`),
      dt.toLocaleString({
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: dt.year !== DateTime.now().year ? '2-digit' : undefined,
      }),
    [dt],
  );

  return <>{formatted}</>;
};
