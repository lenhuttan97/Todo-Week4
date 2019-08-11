import React, { useState } from 'react';
import { Component } from 'react';
import {
  Text, View, Alert, StyleSheet, TouchableOpacity, TextInput, ImageBackground,
  KeyboardAvoidingView, ScrollView
} from 'react-native';
import { todo } from '../data.js';

export default class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: todo,
      todoBody: ''
    }
  }

  onToggleTodo = id => {
    const todo = this.state.todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = this.state.todoList.findIndex(todo => todo.id === id);
    this.state.todoList[foundIndex] = todo;
    const newTodoList = [...this.state.todoList];
    this.setState({ todoList: newTodoList },
      () => {
        setTimeout(() => {
          this.props.navigation.navigate('SingleTodo', {
            updatedTodo: todo
          });
        }, 1000);
      });


  };
  onDeleteTodo = id => {
    const newTodoList = this.state.todoList.filter(todo => todo.id !== id);
    this.setState({ todoList: newTodoList });
  };
  onLongPress = props => {
    const prompt = `"${props.todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => props.onDeleteTodo(props.todo.id) }
      ],
      { cancelable: true }
    );
  };
  onSubmitTodo = () => {
    const newTodo = {
      body: this.state.todoBody,
      status: 'Active',
      id: this.state.todoList.length + 1
    };
    const newTodoList = [...this.state.todoList, newTodo];
    this.setState({ todoList: newTodoList, todoBody: '' });
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
          onLongPress={() => this.onLongPress({ todo: props.todo, onDeleteTodo: props.onDeleteTodo })}
        >
          <Text style={styles.todoText}>
            {props.idx + 1}: {props.todo.body}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <ImageBackground style={styles.container}   source={require('../assets/images/1.png')} >
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          style={styles.KeyboardAvoiding}
        >
          <ScrollView style={styles.scrollView}>
            <View>
              {this.state.todoList.map((todo, idx) => {
                return (
                  <TodoItem
                    idx={idx}
                    todo={todo}
                    key={todo.body}
                    onToggleTodo={this.onToggleTodo}
                    onDeleteTodo={this.onDeleteTodo}
                  />
                );
              })}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={this.state.todoBody}
                style={styles.todoInput}
                onChangeText={text => this.setState({ todoBody: text })}
              />
              <TouchableOpacity style={styles.button} onPress={this.onSubmitTodo}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
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
  },
  todoInput: {
    width: '95%',
    minHeight: 30,
    color: 'black',
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginTop: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  scrollView: {
    flex: 1,
  },
  KeyboardAvoiding:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});