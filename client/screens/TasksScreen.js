import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Dialog from 'react-native-dialog';

import {ListItem} from '../components/ListItem.js';

export default class TasksScreen extends React.Component {
    static navigationOptions = {
        header: null,
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
        console.log("Testing");
        this.setState({ showAddDialog: true });
    }

    addTask = () => {
        this.setState({
            showAddDialog: false,
            tasks: [...this.state.tasks, {title: this.state.newTaskTitle, description: this.state.newTaskDescription}],
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.contentContainer}
                    data={this.state.tasks}
                    renderItem={({item}) => <ListItem data={item}/>}/>

                <ActionButton
                    buttonColor="#2F95DC"
                    onPress={this.onAddClicked}/>

                <Dialog.Container visible={this.state.showAddDialog}>
                    <Dialog.Title>Add new task</Dialog.Title>
                    <Dialog.Input label="Title" onChangeText={(newTaskTitle) => this.setState({newTaskTitle})}/>
                    <Dialog.Input label="Description" onChangeText={(newTaskDescription) => this.setState({newTaskDescription})}/>
                    <Dialog.Button label="Cancel" onPress={() => {this.setState({ showAddDialog: false })}}/>
                    <Dialog.Button label="Add" onPress={this.addTask}/>
                </Dialog.Container>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
