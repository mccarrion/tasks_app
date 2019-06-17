import React from 'react';

export default class RegisterScreen extends React.Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    render() {
        return (
            <View style={styles.container}></View>
        );
    }
}