import React, {Component}from 'react';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { updateTodo, deleteToDo} from './TodoRedux'

class Todo extends Component {
  constructor(props) {
    super(props);
    this.onCheck = this.onCheck.bind(this)
    this.deleteToDoItem = this.deleteToDoItem.bind(this)
   }

   onCheck() {
     this.props.updateTodo(this.props.todo.id, !this.props.todo.completed)
   }

   deleteToDoItem(){
     this.props.deleteToDo(this.props.todo.id)

   }
   render() {
    const {
      todo: {
      title,
      completed,
      date_to_complete,
      completed_on,
      createdAt}} = this.props

   const now = new Date()
   const completedDate = new Date(completed_on)
   const complete = completed ? `Completed On: ${completedDate.toDateString()}` : ''
   const createdOn = new Date(createdAt).toDateString()
   const durationToComplete = new Date(date_to_complete) > now && !completed ? `Time Left: ${moment(date_to_complete).fromNow()}` : ''

   const label = (
     <span style={{
       textDecoration: complete ? 'line-through' : 'none',
       color: complete ? 'red' : 'blue',
     }}>
       <i>Title:</i> {title} <br />
       <i>Created On: </i>{createdOn} <br />
       <i>{complete}</i>
       <i>{durationToComplete}</i>
     </span>
   )
   return (
   <div>
     <Checkbox
       checked={completed}
       label={label}
       onCheck={this.onCheck}
     />
     {completed ? <Link to='#' style={{color: 'red'}} onClick ={this.deleteToDoItem}>Delete</Link> : ''}
    <hr />
     </div>)
  }
}

  function mapStateToProps(state) {
    return {
      todos: state.todos,
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      updateTodo,
      deleteToDo
    }, dispatch)
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Todo);

