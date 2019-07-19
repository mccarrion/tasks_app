import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { ListItem } from '../components/ListItem';

export default class CompletedScreen extends React.Component {
  static navigationOptions = {
    title: 'Completed',
  };

  constructor(props) {
    super(props);

    this.fetchTasks = this.fetchTasks.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      tasks: [],
      showEditWindow: false,
    };
  }

  componentDidMount() {
    this.fetchTasks().then((tasks) => {
      tasks.sort((a, b) => a.id = b.id);
      this.setState({tasks});
    });
  }

  async fetchTasks() {
    const result = await fetch(`${API_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Authorization': AUTH_TOKEN,
      }
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <ListItem
              data={item}
              onClick={() => this.onItemClicked(index)}
              onTaskCheckedChange={() => this.onTaskCheckedChange(index)}
            />
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
