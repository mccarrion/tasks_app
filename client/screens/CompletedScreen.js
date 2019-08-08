import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import { TaskItem } from '../components/TaskItem';
import { API_URL } from '../constants/General';

export default class CompletedScreen extends React.Component {
  static navigationOptions = {
    title: 'Completed',
  };

  constructor(props) {
    super(props);

    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      tasks: [],
      showEditWindow: false,
      currentTaskIndex: 0,
      currentTaskTitle: "",
      currentTaskContent: "",
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('userToken');
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Authorization': token,
      }})
      .then(res => res.json());
    
    const data = res ? Object.values(res) : [];
    this.setState({ tasks: data });
  }

  async updateTask(task) {
    const token = await AsyncStorage.getItem('userToken');
    const result = await fetch(`${API_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(task),
    });

    return result.json();
  }

  async deleteTask(task) {
    const token = await AsyncStorage.getItem('userToken');
    await fetch(`${API_URL}/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
      },
    });
  }

  onItemClicked = (index) => {
    this.setState({
      showEditWindow: true,
      currentTaskIndex: index,
      currentTaskTitle: this.state.tasks[index].title,
      currentTaskContent: this.state.tasks[index].content,
    });
  }

  onCancelClicked = () => {
    this.setState({showEditWindow: false});
  }

  onTaskCheckedChange = (index) => {
    let tasks = [...this.state.tasks];
    let currentTask = tasks[index];

    currentTask.completed = !currentTask.completed;

    this.setState({tasks});
    this.updateTask(currentTask);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.tasks}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <Text>{item.title}</Text>
            // <TaskItem
            //   data={item}
            //   onClick={() => this.onItemClicked(index)}
            //   onTaskCheckedChange={() => this.onTaskCheckedChange(index)}
            // />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
