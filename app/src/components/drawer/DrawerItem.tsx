import { IconProps } from '@theme/icons';
import { useStyles } from '@theme/styles';
import { Href, useRouter } from 'expo-router';
import { ComponentPropsWithoutRef, FC } from 'react';
import { Drawer } from 'react-native-paper';
import { useDrawerActions } from '#/drawer/DrawerContextProvider';
import { usePath } from '#/usePath';

export interface DrawerItemProps
  extends Pick<ComponentPropsWithoutRef<typeof Drawer.Item>, 'onPress'> {
  href: Href;
  label: string;
  icon?: FC<IconProps>;
  disabled?: boolean;
}

export function DrawerItem({ href, label, icon: Icon, disabled, ...props }: DrawerItemProps) {
  const { stateLayer } = useStyles().theme;
  const router = useRouter();
  const { close } = useDrawerActions();
  const currentPath = usePath();
  const hrefPath = getHrefPath(href);

  return (
    // <Link href={href} asChild>
    <Drawer.Item
      label={label}
      icon={Icon ? (props) => <Icon {...props} /> : undefined}
      active={currentPath.includes(hrefPath)}
      {...(disabled && {
        onPress: undefined,
        icon: Icon && ((props) => <Icon {...props} color={stateLayer(props.color, 'disabled')} />),
      })}
      {...props}
      onPress={(e) => {
        close();
        props.onPress ? props.onPress(e) : router.navigate(href);
      }}
    />
    // </Link>
  );
}

function getHrefPath(href: Href) {
  let p: string = typeof href === 'string' ? href : href.pathname;
  if (p.endsWith('/')) p = p.slice(0, p.length - 1);
  return p;
}
