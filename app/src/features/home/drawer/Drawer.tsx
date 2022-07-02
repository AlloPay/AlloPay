import { Box } from '@components/Box';
import { Divider } from '@components/Divider';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { ActivityIcon, ContactsIcon, HomeIcon } from '@util/icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Drawer as PaperDrawer } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerGroupsSection } from './DrawerGroupsSection';
import { DrawerLink } from './DrawerLink';

export interface DrawerProps extends DrawerContentComponentProps {}

export const Drawer = (props: DrawerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Box
      flex={1}
      surface
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <ScrollView>
        <PaperDrawer.Section title="MetaSafe">
          {/* Drawer is only visible on Home screen so it's always active */}
          <DrawerLink screen="Home" icon={HomeIcon} active />
          <DrawerLink screen="Activity" icon={ActivityIcon} />
          <DrawerLink screen="Contacts" icon={ContactsIcon} />
        </PaperDrawer.Section>

        <DrawerGroupsSection />
      </ScrollView>

      {/* <Divider mx={2} />
      <DrawerLink screen="Settings" icon="settings" /> */}
    </Box>
  );
};
