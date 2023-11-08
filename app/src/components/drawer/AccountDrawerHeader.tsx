import { gql } from '@api';
import { createStyles, useStyles } from '@theme/styles';
import { Image } from 'expo-image';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { AddressIcon } from '~/components/Identicon/AddressIcon';
import { withSuspense } from '~/components/skeleton/withSuspense';
import { useQuery } from '~/gql';
import { useSelectedAccount } from '~/hooks/useSelectedAccount';

const Query = gql(/* GraphQL */ `
  query AccountDrawerHeader($account: Address) {
    account(input: { address: $account }) {
      id
      address
      name
      photoUri
    }
  }
`);

function AccountDrawerHeader_() {
  const { styles } = useStyles(stylesheet);

  const { account } = useQuery(Query, { account: useSelectedAccount() }).data;

  if (!account) return null;

  return (
    <View style={styles.container}>
      {account.photoUri ? (
        <Image source={account.photoUri} style={styles.icon} />
      ) : (
        <AddressIcon address={account.address} size={styles.icon.width} />
      )}

      <Text variant="titleLarge" style={styles.name}>
        {account.name}
      </Text>
    </View>
  );
}

const stylesheet = createStyles(({ colors, iconSize }) => ({
  container: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  icon: {
    width: iconSize.large,
    height: iconSize.large,
    borderRadius: iconSize.large / 2,
  },
  name: {
    color: colors.onSurfaceVariant,
  },
}));

export const AccountDrawerHeader = withSuspense(AccountDrawerHeader_);
