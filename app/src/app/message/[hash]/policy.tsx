import { z } from 'zod';
import { MessageLayoutParams } from '~/app/message/[hash]/_layout';
import { PolicyTab } from '~/components/policy/PolicyTab';
import { useLocalParams } from '~/hooks/useLocalParams';

export const MessagePolicyTabParams = MessageLayoutParams;
export type MessagePolicyTabParams = z.infer<typeof MessagePolicyTabParams>;

export default function MessagePolicyTab() {
  const params = useLocalParams(`/message/[hash]/policy`, MessagePolicyTabParams);

  return <PolicyTab hash={params.hash} />;
}
