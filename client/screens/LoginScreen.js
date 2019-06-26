import React from 'react';
import {
    AsyncStorage,
    Button,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { API_URL } from '../constants/General';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    state = {
        username: '',
        password: ''
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    handleSubmit = async () => {
        let data = {
            username: this.state.username,
            password: this.state.password
        };

        let res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            type:'cors',
            body: JSON.stringify(data),
        });
        this._handleResponse(res);
    }

    _handleResponse = async (res) => {
        if (res.status === 200) {
            await AsyncStorage.setItem(
                'userToken', res.headers.get('Authorization')
            );
            this.props.navigation.navigate('Main');
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
                        title='Login'
                        onPress={this.handleSubmit} 
                    />
                    {/* TODO: Change to text and link */}
                    <Button
                        title="Don't have an account? Register"
                        onPress={() => this.props.navigation.navigate('Register')}
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
