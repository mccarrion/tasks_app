import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
                <CheckBox rightText={this.props.data.title} checkBoxColor="#2F95DC" isChecked={this.state.checked} onClick={this.onCheckedChange}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        paddingLeft: 15,
        paddingTop: 15,
    },
});
