import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View
} from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  async _signOut() {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <Button 
          title='Sign Out'
          onPress={this._signOut}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});