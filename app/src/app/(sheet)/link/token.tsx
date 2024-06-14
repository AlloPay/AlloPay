import { useRouter } from 'expo-router';
import { Sheet } from '#/sheet/Sheet';
import { materialCommunityIcon } from '@theme/icons';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from '#/Button';
import { gql } from '@api/generated';
import { showSuccess } from '#/provider/SnackbarProvider';
import { useMutation } from 'urql';
import { z } from 'zod';
import { useLocalParams } from '~/hooks/useLocalParams';
import { createStyles, useStyles } from '@theme/styles';

const Link = gql(/* GraphQL */ `
  mutation ConfirmLinkSheet_Link($token: String!) {
    link(input: { token: $token }) {
      id
      approvers {
        id
      }
    }
  }
`);

export const LinkIcon = materialCommunityIcon('link-variant');

const LinkWithTokenSheetParams = z.object({ token: z.string() });
export type LinkWithTokenSheetParams = z.infer<typeof LinkWithTokenSheetParams>;

export default function LinkWithTokenSheet() {
  const { token } = useLocalParams(LinkWithTokenSheetParams);
  const { styles } = useStyles(stylesheet);
  const { back } = useRouter();
  const link = useMutation(Link)[1];

  return (
    <Sheet handle={false}>
      <View style={styles.infoContainer}>
        <LinkIcon style={styles.icon} />

        <Text variant="titleLarge" style={styles.text}>
          Are you sure you want to link with this device?
        </Text>

        <View>
          <Text variant="titleMedium" style={styles.text}>
            Only link with your own device
          </Text>

          <Text variant="bodyLarge" style={styles.text}>
            The device will be added to your user, and will be able to do anything on your behalf
            except approve proposals
          </Text>
        </View>

        <Button
          mode="contained"
          icon={LinkIcon}
          style={styles.button}
          onPress={async () => {
            const r = await link({ token });
            if (!r.data) return;
            showSuccess('Linked');
            back();
          }}
        >
          Link
        </Button>
      </View>
    </Sheet>
  );
}

const stylesheet = createStyles(({ colors, iconSize }) => ({
  infoContainer: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    gap: 16,
  },
  icon: {
    color: colors.onSurface,
    fontSize: iconSize.large,
  },
  text: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.tertiary,
    alignSelf: 'stretch',
  },
}));

export { ErrorBoundary } from '#/ErrorBoundary';
