import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import CheckBox from 'react-native-check-box';

export class TaskItem extends React.Component {
  render() {
    return (
      <View style={styles.listItem}>
        <CheckBox checkBoxColor="#2F95DC" isChecked={this.props.task.completed} onClick={this.props.onCheckedChange}/>

        <TouchableOpacity onPress={this.props.onClick}>
          <Text style={styles.taskText}>{this.props.task.title}</Text>
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
