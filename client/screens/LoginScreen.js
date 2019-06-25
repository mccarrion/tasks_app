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
            this.props.navigation.navigate('App');
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        width: 200,
        height: 40,
        fontSize: 12,
    },
});