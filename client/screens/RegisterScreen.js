import React from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { API_URL } from '../constants/General';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };

  state = {
    username: '',
    password: ''
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  async handleSubmit() {
    let data = {
      username: this.state.username,
      password: this.state.password
    };

    let res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    this.handleResponse(res);
  }

  handleResponse = (res) => {
    if (res.status === 201) {
      alert("Successful registration!");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder='Username'
            onChangeText={value => this.onChangeText('username', value)} 
          />
          <TextInput 
            style={styles.input}
            placeholder='Password'
            onChangeText={value => this.onChangeText('password', value)}
          />
          <Button 
            title='Register'
            onPress={this.handleSubmit} 
          />
          {/* TODO: Change to text and link */}
          <Button
            title="Have an account? Login"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    },
    card: {
    flexDirection: 'column',
    justifyContent: 'center',
    // TODO: use flexDirection 'column' to center form
    height: 400,
    width: 250,
    backgroundColor: '#fff',
    },
    input: {
      alignItems: 'center',
      height: 40,
      margin: 5,
      fontSize: 18,
    },
});
