import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainMenu from './MainMenu';
import DrawNavi from './DrawNavi';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="MainMenu">
      <Drawer.Screen name="MainMenu" component={MainMenu} />
      <Drawer.Screen name="DrawNavi" component={DrawNavi} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
