import React from 'react';
import {
    Button,
    StyleSheet,
    TextInput,
    View
} from 'react-native';

export default class RegisterScreen extends React.Component {
    state = {
        username: '',
        email: '',
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
            email: this.state.email,
            password: this.state.password
        };

        try {
            let res = await fetch('API_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            this.handleResponse(res);
        } catch(error) {
            alert(error);
        }
    }

    handleResponse = (res) => {
        if (res.status === 201) {
            alert("Successful registration!");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    onChangeText={value => this.handleChange('username', value)} 
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={value => this.handleChange('email', value)} 
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={value => this.handleChange('password', value)}
                />
                <Button 
                    title='Register'
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
