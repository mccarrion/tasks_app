import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';

import ActionButton from 'react-native-action-button';

import {ListItem} from '../components/ListItem.js';

export default class TasksScreen extends React.Component {
    static navigationOptions = {
        title: "Tasks",
    };

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            showAddDialog: false,
            newTaskTitle: "",
            newTaskDescription: "",
        };
    }

    onAddClicked = () => {
        this.setState({
            showAddDialog: true,
            newTaskTitle: "",
            newTaskDescription: "",
        });
    }

    addTask = () => {
        this.setState({
            tasks: [...this.state.tasks, {title: this.state.newTaskTitle, description: this.state.newTaskDescription, checked: false}],
            showAddDialog: false,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <ListItem data={item} onCheckedChange={(checked) => {item.checked = checked}}/>}/>

                <ActionButton
                    buttonColor="#2F95DC"
                    onPress={this.onAddClicked}/>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showAddDialog}
                    onRequestClose={() => this.setState({showAddDialog: false})}>

                    <View style={styles.modalContainer}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => {this.setState({showAddDialog: false})}}>
                                <Text style={styles.taskModalButton}>Cancel</Text>
                            </TouchableOpacity>

                            <Text style={styles.newTaskHeader}>Add new task</Text>

                            <TouchableOpacity onPress={this.addTask}>
                                <Text style={styles.taskModalButton}>Finish</Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput style={styles.textInput} placeholder="Title" value={this.state.newTaskTitle} onChangeText={(newTaskTitle) => this.setState({newTaskTitle})}/>
                        <TextInput style={styles.textInput} placeholder="Description" value={this.state.newTaskDescription} onChangeText={(newTaskDescription) => this.setState({newTaskDescription})}/>

                        {/*
                        <View style={styles.row}>
                        <Button style={styles.button} title="Cancel" onPress={() => {this.setState({showAddDialog: false})}}/>
                        <Button style={styles.button} title="Add" onPress={this.addTask}/>
                        </View>
                        */}
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalContainer: {
        margin: 15,
    },
    newTaskHeader: {
        fontSize: 24,
    },
    textInput: {
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    taskModalButton: {
        fontSize: 24,
        color: "#2F95DC",
    },
});
