import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TasksScreen from '../screens/TasksScreen';
import CompletedScreen from '../screens/CompletedScreen';
import ProfileScreen from '../screens/ProfileScreen';

const TasksStack = createStackNavigator({
  Tasks: TasksScreen,
});

TasksStack.navigationOptions = {
  tabBarLabel: 'Tasks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-checkmark' 
          : 'md-checkmark'
      }
    />
  ),
};

const CompletedStack = createStackNavigator({
  Completed: CompletedScreen,
});

CompletedStack.navigationOptions = {
  tabBarLabel: 'Completed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-done-all' : 'md-done-all'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  TasksStack,
  CompletedStack,
  ProfileStack,
});
