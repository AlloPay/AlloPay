import { useRouter } from 'expo-router';
import { z } from 'zod';
import { useLocalParams } from '~/hooks/useLocalParams';
import { AddIcon } from '@theme/icons';
import { ListHeader } from '~/components/list/ListHeader';
import { ListItem } from '~/components/list/ListItem';
import { StyleSheet, View } from 'react-native';
import { AppbarOptions } from '~/components/Appbar/AppbarOptions';
import { PolicyTemplateType } from '~/lib/policy/template';
import { PoliciesScreenParams } from '~/app/[account]/policies';
import { PolicyScreenParams } from '~/app/[account]/policies/[key]';

export const PolicyTemplateModalParams = PoliciesScreenParams;
export type PolicyTemplateModalParams = z.infer<typeof PolicyTemplateModalParams>;

export default function PolicyTemplateModal() {
  const { account } = useLocalParams(`/[account]/policies/template`, PolicyTemplateModalParams);
  const router = useRouter();

  const handle = (template: PolicyTemplateType) => () => {
    const params: PolicyScreenParams = { account, key: 'add', template };
    router.replace({ pathname: `/[account]/policies/[key]/`, params });
  };

  return (
    <View style={styles.root}>
      <AppbarOptions mode="large" leading="back" headline="Add policy" />

      <ListHeader>Policy for transactions that are</ListHeader>

      <ListItem
        headline="Low risk"
        supporting="One approval recommended"
        trailing={AddIcon}
        onPress={handle('low')}
      />

      <ListItem
        headline="Medium risk"
        supporting="A few approvals recommended"
        trailing={AddIcon}
        onPress={handle('medium')}
      />

      <ListItem
        headline="High risk"
        supporting="Several approvals recommended"
        trailing={AddIcon}
        onPress={handle('high')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
