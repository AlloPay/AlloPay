import { Box } from '~/components/layout/Box';
import { Formik } from 'formik';
import { Appbar, Button, Text } from 'react-native-paper';
import { StackNavigatorScreenProps } from '~/navigation/StackNavigator';
import * as Yup from 'yup';
import { useCallback } from 'react';
import { FormikTextField } from '~/components/fields/FormikTextField';
import { CreateAccountResult, useCreateAccount } from '~/mutations/account/useCreateAccount.api';
import { AppbarBack } from '~/components/Appbar/AppbarBack';
import { makeStyles } from '~/util/theme/makeStyles';

interface Values {
  name: string;
}

const schema: Yup.SchemaOf<Values> = Yup.object({
  name: Yup.string().required('Required'),
});

export interface CreateAccountScreenParams {
  onCreate?: (res: CreateAccountResult) => void;
}

export type CreateAccountScreenProps = StackNavigatorScreenProps<'CreateAccount'>;

export const CreateAccountScreen = ({
  route,
  navigation: { navigate },
}: CreateAccountScreenProps) => {
  const { onCreate } = route.params;
  const styles = useStyles();
  const createAccount = useCreateAccount();

  const handleSubmit = useCallback(
    async ({ name }: Values) => {
      const r = await createAccount(name);
      onCreate ? onCreate(r) : navigate('Account', { account: r.account });
    },
    [createAccount, navigate, onCreate],
  );

  return (
    <Box flex={1}>
      <Appbar.Header>
        <AppbarBack />
      </Appbar.Header>

      <Formik initialValues={{ name: '' }} onSubmit={handleSubmit} validationSchema={schema}>
        {({ submitForm, isSubmitting }) => (
          <Box style={styles.container}>
            <Text variant="headlineLarge" style={styles.input}>
              What should we call your account?
            </Text>

            <FormikTextField name="name" label="Account name" autoFocus />

            <Box style={styles.actionContainer}>
              <Button mode="contained" loading={isSubmitting} onPress={submitForm}>
                Create
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

const useStyles = makeStyles(({ space, s }) => ({
  container: {
    flex: 1,
    marginHorizontal: s(16),
  },
  input: {
    textAlign: 'center',
    marginVertical: space(4),
  },
  actionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: s(16),
  },
}));
