import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
  TransitionPresets,
} from '@react-navigation/stack';
import { AccountsSheet } from '~/screens/AccountsSheet/AccountsSheet';
import { AddressSheet, AddressSheetScreenParams } from '~/screens/AddressSheet/AddressSheet';
import { AlertModal, AlertModalParams } from '~/screens/alert/AlertModal';
import { ContactScreen, ContactScreenParams } from '~/screens/Contact/ContactScreen';
import { ContactsScreen, ContactsScreenParams } from '~/screens/contacts/ContactsScreen';
import { CreateAccountScreen } from '~/screens/CreateAccount/CreateAccountScreen';
import { CreateUserScreen } from '~/screens/CreateUser/CreateUserScreen';
import { HomeScreen } from '~/screens/Home/HomeScreen';
import { OnboardScreen } from '~/screens/Onboard/OnboardScreen';
import { useShowOnboarding } from '~/screens/Onboard/useShowOnboarding';
import { ProposalScreen, ProposalScreenParams } from '~/screens/Proposal/ProposalScreen2';
import { QrModalScreen, QrModalScreenParams } from '~/screens/QrModal/QrModalScreen';
import { ScanScreen, ScanScreenParams } from '~/screens/Scan/ScanScreen';
import { SendScreen, SendScreenParams } from '~/screens/Send/SendScreen2';
import { SessionsScreen } from '~/screens/sessions/SessionsScreen';
import { SettingsScreen } from '~/screens/Settings/SettingsScreen';
import { TokensScreen, TokensScreenParams } from '~/screens/tokens/TokensScreen';
import { UserScreen } from '~/screens/User/UserScreen';

export type StackNavigatorParamList = {
  Home: undefined;
  CreateAccount: undefined;
  Scan: ScanScreenParams;
  Proposal: ProposalScreenParams;
  Send: SendScreenParams;
  Contacts: ContactsScreenParams;
  Contact: ContactScreenParams;
  Settings: undefined;
  User: undefined;
  Sessions: undefined;
  Tokens: TokensScreenParams;
  // Onboarding
  Onboard: undefined;
  CreateUser: undefined;
  // Account
  // Transparent modal
  AccountsSheet: undefined;
  AddressSheet: AddressSheetScreenParams;
  QrModal: QrModalScreenParams;
  Alert: AlertModalParams;
  // Card modal
  ContactsModal: ContactsScreenParams;
  TokensModal: TokensScreenParams;
};

export type StackNavigatorNavigationProp = StackNavigationProp<StackNavigatorParamList>;

export type StackNavigatorScreenProps<K extends keyof StackNavigatorParamList> = StackScreenProps<
  StackNavigatorParamList,
  K
>;

const Navigation = createStackNavigator<StackNavigatorParamList>();

export const StackNavigator = () => {
  const showOnboarding = useShowOnboarding();

  return (
    <Navigation.Navigator screenOptions={{ headerShown: false }}>
      {showOnboarding && (
        <Navigation.Group>
          <Navigation.Screen name="Onboard" component={OnboardScreen} />
          <Navigation.Screen name="CreateUser" component={CreateUserScreen} />
        </Navigation.Group>
      )}

      <Navigation.Screen name="Home" component={HomeScreen} />
      <Navigation.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Navigation.Screen name="Scan" component={ScanScreen} />
      <Navigation.Screen name="Proposal" component={ProposalScreen} />
      <Navigation.Screen name="Send" component={SendScreen} />
      <Navigation.Screen name="Contacts" component={ContactsScreen} />
      <Navigation.Screen name="Contact" component={ContactScreen} />
      <Navigation.Screen name="Settings" component={SettingsScreen} />
      <Navigation.Screen name="User" component={UserScreen} />
      <Navigation.Screen name="Sessions" component={SessionsScreen} />
      <Navigation.Screen name="Tokens" component={TokensScreen} />

      <Navigation.Group screenOptions={{ presentation: 'transparentModal' }}>
        <Navigation.Screen name="AccountsSheet" component={AccountsSheet} />
        <Navigation.Screen name="AddressSheet" component={AddressSheet} />
        <Navigation.Screen name="QrModal" component={QrModalScreen} />
        <Navigation.Screen name="Alert" component={AlertModal} />
      </Navigation.Group>

      <Navigation.Group
        screenOptions={{
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <Navigation.Screen name="ContactsModal" component={ContactsScreen} />
        <Navigation.Screen name="TokensModal" component={TokensScreen} />
      </Navigation.Group>
    </Navigation.Navigator>
  );
};
