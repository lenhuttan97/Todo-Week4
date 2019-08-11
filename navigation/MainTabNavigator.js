import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CompleteScreen from '../screens/CompleteScreen';
import AddScreen from '../screens/AddScreen';
import ActiveScreen from '../screens/ActiveScreen';
import SingleTodoScreen from '../components/SingleTodoScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const CompleteStack = createStackNavigator(
  {
    Complete: CompleteScreen
  },
  config
);

CompleteStack.navigationOptions = {
  tabBarLabel: 'Complete',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-done-all' : 'md-link'}
    />
  )
};

CompleteStack.path = '';

const addStack = createStackNavigator(
  {
    Links: AddScreen,
    SingleTodo: SingleTodoScreen
  },
  config
);

addStack.navigationOptions = {
  tabBarLabel: 'Todo list',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

addStack.path = '';

const ActiveStack = createStackNavigator(
  {
    Settings: ActiveScreen,
  },
  config
);

ActiveStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

ActiveStack.path = '';

const tabNavigator = createBottomTabNavigator({
  CompleteStack,
  addStack,
  ActiveStack,
});

tabNavigator.path = '';

export default tabNavigator;
