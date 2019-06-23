import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch token from storage then navigate
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userStorage');

        // Switch to App or Auth screen and loading screen will be unmounted
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    // Render loading content
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}