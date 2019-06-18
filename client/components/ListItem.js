import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import CheckBox from 'react-native-check-box';

export class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {checked: this.props.data.checked};
    }

    onCheckedChange = () => {
        this.setState({checked: !this.state.checked}, () => {
            this.props.onCheckedChange(this.state.checked);
        });
    }

    render() {
        return (
            <View style={styles.listItem}>
                <CheckBox checkBoxColor="#2F95DC" isChecked={this.state.checked} onClick={this.onCheckedChange}/>

                <TouchableOpacity onPress={this.props.onClick}>
                    <Text style={styles.taskText}>{this.props.data.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        paddingLeft: 15,
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskText: {
        fontSize: 20,
        marginLeft: 10,
    }
});
