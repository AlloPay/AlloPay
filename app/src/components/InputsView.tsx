import { FragmentType, gql, useFragment } from '@api/generated';
import { SwapVerticalIcon } from '@theme/icons';
import { createStyles, useStyles } from '@theme/styles';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { asBigInt, fiatToToken, tokenToFiat } from 'lib';
import { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { FiatValue } from '~/components/FiatValue';
import { TokenAmount } from '~/components/token/TokenAmount';

const FragmentDoc = gql(/* GraphQL */ `
  fragment InputsView_token on Token @argumentDefinitions(account: { type: "Address!" }) {
    id
    decimals
    balance(input: { account: $account })
    price {
      id
      current
    }
    ...TokenAmount_token
  }
`);

const BUTTON_WIDTH = 64;
const ICON_BUTTON_WIDTH = 40;

export enum InputType {
  Token = 0,
  Fiat = 1,
}

export interface InputsViewProps {
  token: FragmentType<typeof FragmentDoc>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  type: InputType;
  setType: Dispatch<SetStateAction<InputType>>;
}

export const InputsView = ({ input, setInput, type, setType, ...props }: InputsViewProps) => {
  const { styles } = useStyles(stylesheet);
  const token = useFragment(FragmentDoc, props.token);

  const inputAmount = input || '0';

  const tokenAmount =
    type === InputType.Token
      ? parseUnits(inputAmount, token.decimals).toBigInt()
      : fiatToToken(parseFloat(inputAmount), token.price?.current ?? 0, token.decimals);

  const fiatValue =
    type === InputType.Token
      ? tokenToFiat(tokenAmount, token.price?.current ?? 0, token.decimals)
      : parseFloat(inputAmount);

  return (
    <View style={styles.container}>
      <View style={styles.primaryInputContainer}>
        <Button
          mode="text"
          labelStyle={styles.button}
          onPress={() => {
            setType(InputType.Token);
            setInput(formatUnits(token.balance, token.decimals));
          }}
        >
          Max
        </Button>

        <Text
          variant="displayMedium"
          style={styles.primaryInput}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {type === InputType.Token ? input || '0' : `$${input || 0}`}
        </Text>

        <IconButton
          icon={SwapVerticalIcon}
          iconColor={styles.button.color}
          style={styles.iconButton}
          onPress={() => setType((type) => Number(!type))}
        />
      </View>

      <Text
        variant="titleLarge"
        style={styles.secondaryInput}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {input.length ? (
          type !== InputType.Token ? (
            <TokenAmount amount={tokenAmount} token={token} />
          ) : (
            <FiatValue value={fiatValue} />
          )
        ) : undefined}
      </Text>

      {tokenAmount > asBigInt(token.balance) && (
        <Text style={styles.balanceWarning}>Greater than available balance</Text>
      )}
    </View>
  );
};

const stylesheet = createStyles(({ colors }) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 32,
  },
  primaryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  button: {
    color: colors.secondary,
  },
  iconButton: {
    marginLeft: BUTTON_WIDTH - ICON_BUTTON_WIDTH,
  },
  primaryInput: {
    flex: 1,
    textAlign: 'center',
    color: colors.primary,
  },
  secondaryInput: {
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  balanceWarning: {
    color: colors.warning,
    textAlign: 'center',
    marginVertical: 8,
  },
}));
