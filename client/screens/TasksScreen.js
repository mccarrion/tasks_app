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
            showEditWindow: false,
            currentTaskIndex: 0,
            currentTaskOriginal: null,
        };
    }

    onAddClicked = () => {
        this.setState({
            tasks: [...this.state.tasks, {title: "", description: "", checked: false}],
            showEditWindow: true,
            currentTaskIndex: this.state.tasks.length,
            currentTaskOriginal: null,
        });
    }

    onItemClicked = (index) => {
        this.setState({
            showEditWindow: true,
            currentTaskIndex: index,
            currentTaskOriginal: Object.assign({}, this.state.tasks[index]),
        });
    }

    onCancelClicked = () => {
        let tasks = [...this.state.tasks];

        if (this.state.currentTaskOriginal) {
            tasks[this.state.currentTaskIndex] = this.state.currentTaskOriginal;
        } else {
            tasks.splice(this.state.currentTaskIndex, 1);
        }

        this.setState({
            tasks,
            showEditWindow: false,
        });
    }

    onFinishClicked = () => {
        let tasks = [...this.state.tasks];
        let currentTask = tasks[this.state.currentTaskIndex];

        if (currentTask.title === "") {
            tasks.splice(this.state.currentTaskIndex, 1);
        }

        this.setState({
            tasks,
            showEditWindow: false,
        });
    }

    onTaskTitleChange = (newTitle) => {
        let tasks = [...this.state.tasks];
        tasks[this.state.currentTaskIndex].title = newTitle;
        this.setState({tasks});
    }

    onTaskDescriptionChange = (newDescription) => {
        let tasks = [...this.state.tasks];
        tasks[this.state.currentTaskIndex].description = newDescription;
        this.setState({tasks});
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <ListItem 
                            data={item}
                            onClick={() => this.onItemClicked(index)}
                            onCheckedChange={(checked) => {item.checked = checked}}/>
                    )}/>

                <ActionButton
                    buttonColor="#2F95DC"
                    onPress={this.onAddClicked}/>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showEditWindow}
                    onRequestClose={() => this.setState({showEditWindow: false})}>

                    <View style={styles.modalContainer}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={this.onCancelClicked}>
                                <Text style={styles.taskModalButton}>Cancel</Text>
                            </TouchableOpacity>

                            <Text style={styles.currentTaskHeader}>
                                {this.state.currentTaskOriginal ? "Edit Task" : "New Task"}
                            </Text>

                            <TouchableOpacity onPress={this.onFinishClicked}>
                                <Text style={styles.taskModalButton}>Finish</Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput 
                            style={styles.textInput} 
                            placeholder="Title" 
                            value={this.state.tasks[this.state.currentTaskIndex] ? this.state.tasks[this.state.currentTaskIndex].title : ""} 
                            onChangeText={this.onTaskTitleChange}/>

                        <TextInput 
                            style={styles.textInput} 
                            placeholder="Description" 
                            value={this.state.tasks[this.state.currentTaskIndex] ? this.state.tasks[this.state.currentTaskIndex].description : ""} 
                            onChangeText={this.onTaskDescriptionChange}/>
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
    currentTaskHeader: {
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
