import { makeStyles } from '~/util/theme/makeStyles';
import { Paragraph } from 'react-native-paper';
import { Percent } from './Percent';

export interface PriceDeltaProps {
  change: number;
}

export const PriceChange = ({ change }: PriceDeltaProps) => {
  const styles = useStyles();

  if (change === 0) return null;

  return (
    <Paragraph style={change > 0 ? styles.positive : styles.negative}>
      <Percent value={change} />
    </Paragraph>
  );
};

const useStyles = makeStyles(({ colors }) => ({
  positive: {
    color: colors.green,
  },
  negative: {
    color: colors.error,
  },
}));
