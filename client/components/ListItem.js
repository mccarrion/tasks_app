import React from 'react';
import { View, Text } from 'react-native';

export class ListItem extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.data.title}</Text>
                <Text>{this.props.data.description}</Text>
            </View>
            );
    }
}
