import React, { useState } from 'react';
import { Component } from 'react';
import { Text, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { todo } from '../data.js';
import { ScrollView } from 'react-native-gesture-handler';

export default class AddScreen extends Component {
  constructor(props) {
		super(props);
		this.state = {
      todoList: todo
		}
	  }

    onToggleTodo = id => {
      const todo = this.state.todoList.find(todo => todo.id === id);
      todo.status = todo.status === 'Done' ? 'Active' : 'Done';
      const foundIndex = this.state.todoList.findIndex(todo => todo.id === id);
      this.state.todoList[foundIndex] = todo;
      const newTodoList = [...this.state.todoList];
      this.setState({todoList: newTodoList});
    };
    
  render() {
   

    TodoItem = props => {
      const statusStyle = {
        backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'
      };
      return (
        <TouchableOpacity
          key={props.todo.body}
          style={[styles.todoItem, statusStyle]}
          onPress={() => props.onToggleTodo(props.todo.id)}
        >
          <Text style={styles.todoText}>
            {props.idx + 1}: {props.todo.body}
          </Text>
        </TouchableOpacity>
      );
    };
  return (
    <ScrollView>
      <View style={styles.container}>
      {this.state.todoList.map((todo, idx) => {
    return (
      <TodoItem
        idx={idx}
        todo={todo}
        key={todo.body}
        onToggleTodo={this.onToggleTodo}
      />
    );
  })}
      </View>
    </ScrollView>
  );
}
}

AddScreen.navigationOptions = {
  title: 'All Todos'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
});