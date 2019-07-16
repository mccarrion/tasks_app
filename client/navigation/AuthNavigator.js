import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

export default class AuthNavigator extends React.Component {
  static router = AuthStack.router;
  render() {
    const { navigation } = this.props;

    return <AuthStack navigation={navigation} />;
  }
}