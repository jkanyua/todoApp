import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {Link} from 'react-router-dom';
import { getTodos, addTodo } from './TodoRedux';
import {getToken, deleteToken} from '../utils'
import Todo from './Todo'

import './todos.css'

class Todos extends Component {
constructor(props){
  super(props);
  this.state = {
    todoTitle: '',
    todoCompleteOn: null,
    error: null
  }
  this.addTodo = this.addTodo.bind(this)
  this.handleRequestClose = this.handleRequestClose.bind(this)
 }
componentWillMount(){
    if(!getToken()){
      this.props.history.push('/login')
    }
}
 componentDidMount() {
  this.props.getTodos()
 }

 handleRequestClose() {
  this.setState({
    error: false,
  });
};
 addTodo(){
   if(!this.state.todoTitle || !this.state.todoCompleteOn){
     return this.setState({error: 'Type a todo Title and Date.'})
   }
   this.props.addTodo({
     title: this.state.todoTitle,
     complete_on: this.state.todoCompleteOn
    }).then(() => this.setState({
      error: null,
      todoTitle: '',
      todoCompleteOn: null,
    }))
 }

 disablePriorToday(date) {
  return date < Date.now()
 }

renderTodos() {
  const { todoItems } = this.props.todos
  const todos = todoItems.map(item => 
    <Todo 
      key={item.id}
      todo={item}
    />)
    return todos
}
render() {
  const divStyle = {
    margin: '0 auto',
    width: '500px',
  }
  return (
    <div style={divStyle}>
      <main id="todolist">
        <h1> Todo List
          <span> Get things done, one item at a time. | <Link to ='/login' onClick={()=>deleteToken()}>LogOut</Link> </span>
        </h1>
        <hr /><br /><br />
        {this.renderTodos()}
        <div style={{marginLeft: '15%'}}>
          <TextField
              hintText="Add Todo"
              onChange = {(event,newValue) => this.setState({todoTitle:newValue})}
              value = {this.state.todoTitle}
            />
            <DatePicker
              hintText="Select due date"
              shouldDisableDate={this.disablePriorToday}
              onChange = {(event, date) => this.setState({todoCompleteOn:date})}
              value={this.state.todoCompleteOn}/><br />
            <RaisedButton label="Add Item" primary={true} onClick={this.addTodo}/>
        </div>
        </main>
      <Snackbar
        open={this.state.error ? true : false}
        message={`Error: ${this.state.error}`}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getTodos,
    addTodo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);