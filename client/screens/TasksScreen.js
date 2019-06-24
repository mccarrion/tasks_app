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

const API_URL = "<API URL HERE>";
const AUTH_TOKEN = "<JWT TOKEN HERE>";

export default class TasksScreen extends React.Component {
    static navigationOptions = {
        title: "Tasks",
    };

    constructor(props) {
        super(props);

        this.fetchTasks = this.fetchTasks.bind(this);
        this.createTask = this.createTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);

        this.state = {
            tasks: [],
            showEditWindow: false,
            currentTaskIndex: 0,
            currentTaskTitle: "",
            currentTaskContent: "",
            newTask: false,
        };
    }

    componentDidMount() {
        this.fetchTasks().then((tasks) => {
            tasks.sort((a, b) => a.id - b.id);
            this.setState({tasks});
        });
    }

    async fetchTasks() {
        const result = await fetch(`${API_URL}/tasks`, {
            method: 'GET',
            headers: {
                'Authorization': AUTH_TOKEN,
            },
        });

        return result.json();
    }

    async createTask(title, content) {
        const task = {'title': title, 'content': content};
        const result = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AUTH_TOKEN,
            },
            body: JSON.stringify(task),
        });

        return result.json();
    }

    async updateTask(task) {
        const result = await fetch(`${API_URL}/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AUTH_TOKEN,
            },
            body: JSON.stringify(task),
        });

        return result.json();
    }

    async deleteTask(task) {
        const result = await fetch(`${API_URL}/tasks/${task.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': AUTH_TOKEN,
            },
        });
    }

    onAddClicked = () => {
        this.setState({
            showEditWindow: true,
            currentTaskIndex: this.state.tasks.length,
            currentTaskTitle: "",
            currentTaskContent: "",
            newTask: true,
        });
    }

    onItemClicked = (index) => {
        this.setState({
            showEditWindow: true,
            currentTaskIndex: index,
            currentTaskTitle: this.state.tasks[index].title,
            currentTaskContent: this.state.tasks[index].content,
            newTask: false,
        });
    }

    onCancelClicked = () => {
        this.setState({showEditWindow: false});
    }

    onFinishClicked = () => {
        let tasks = [...this.state.tasks];

        if (this.state.currentTaskTitle !== "") {
            if (this.state.newTask) {
                this.createTask(this.state.currentTaskTitle, this.state.currentTaskContent).then((newTask) => {
                    tasks.push(newTask);
                    this.setState({tasks});
                });
            } else {
                let currentTask = tasks[this.state.currentTaskIndex];
                currentTask.title = this.state.currentTaskTitle;
                currentTask.content = this.state.currentTaskContent;

                this.setState({tasks});
                this.updateTask(currentTask);
            }
        } else if (!this.state.newTask) {
            const currentTask = tasks[this.state.currentTaskIndex];
            tasks.splice(this.state.currentTaskIndex, 1);

            this.setState({tasks});
            this.deleteTask(currentTask);
        }

        this.setState({showEditWindow: false});
    }

    onTaskCheckedChange = (index) => {
        let tasks = [...this.state.tasks];
        let currentTask = tasks[index];

        currentTask.completed = !currentTask.completed;

        this.setState({tasks});
        this.updateTask(currentTask);
    }

    onTaskTitleChange = (newTitle) => {
        this.setState({currentTaskTitle: newTitle});
    }

    onTaskContentChange = (newContent) => {
        this.setState({currentTaskContent: newContent});
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
                            onCheckedChange={() => this.onTaskCheckedChange(index)}/>
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
                                {this.state.newTask ? "New Task" : "Edit Task"}
                            </Text>

                            <TouchableOpacity onPress={this.onFinishClicked}>
                                <Text style={styles.taskModalButton}>Finish</Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={styles.textInput}
                            placeholder="Title"
                            value={this.state.currentTaskTitle}
                            onChangeText={this.onTaskTitleChange}/>

                        <TextInput
                            style={styles.textInput}
                            placeholder="Content"
                            value={this.state.currentTaskContent}
                            onChangeText={this.onTaskContentChange}/>
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
