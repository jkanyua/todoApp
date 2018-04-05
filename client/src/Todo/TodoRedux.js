import request from 'superagent';
import { config } from '../config'
import * as localStorage from '../utils'

/*
 * ----------------- Action Types -------------------
 */

export const types = {
  TODOS_REQUEST: 'TODOS_REQUEST',
  TODOS_SUCCESS: 'TODOS_SUCCESS',
  TODOS_FAILURE: 'TODOS_FAILURE',

  UPDATE_TODO_REQUEST: 'UPDATE_TODO_REQUEST',
  UPDATE_TODO_FAILURE: 'UPDATE_TODO_FAILURE',

  ADD_TODO_FAILURE: 'ADD_TODO_FAILURE'
}

/*
 * ----------------- Action Creators -------------------
 */
function todosRequest(requestedAt) {
  return {
    type: types.TODOS_REQUEST,
    requestedAt
  }
}

function todosSuccess(todos){
  return {
    type: types.TODOS_SUCCESS,
    todos,
  }
}

function todosFailure(err){
  return {
    type: types.TODOS_FAILURE,
    error: err.message,
  }
}

function addTodoFailure(err){
  return {
    type: types.ADD_TODO_FAILURE,
    error: err.message,
  }
}


function updateTodoRequest(requestedAt) {
  return {
    type: types.UPDATE_TODO_REQUEST,
    requestedAt
  }
}

function updateTodoFailure(err){
  return {
    type: types.UPDATE_TODOS_FAILURE,
    error: err.message,
  }
}

export function getTodos() {
  return (dispatch) => {
    const requestedAt = Date.now()
    dispatch(todosRequest(requestedAt));
    return (
      request
        .get(`${config.base_url}todos`)
        .set('Authorization', localStorage.getToken())
        .then((response) => {
          dispatch(todosSuccess(response.body));
        }).catch((err) => {
          dispatch(todosFailure(err));
        })
    );
  };
}
export function updateTodo(todoId, isChecked) {
  return (dispatch) => {
    const requestedAt = Date.now()
    dispatch(updateTodoRequest(requestedAt));
    return (
      request
        .put(`${config.base_url}todos/${todoId}`)
        .set('Authorization', localStorage.getToken())
        .send({completed: isChecked})
        .then((response) => {
          request
            .get(`${config.base_url}todos`)
            .set('Authorization', localStorage.getToken())
            .then((response) => {
              dispatch(todosSuccess(response.body));
            }).catch((err) => {
              dispatch(todosFailure(err));
            })
        }).catch((err) => {
          dispatch(updateTodoFailure(err));
        })
    );
  };
}

export function deleteToDo(todoId) {
  return (dispatch) => {
    const requestedAt = Date.now()
    dispatch(updateTodoRequest(requestedAt));
    return (
      request
        .delete(`${config.base_url}todos/${todoId}`)
        .set('Authorization', localStorage.getToken())
        .then((response) => {
          request
            .get(`${config.base_url}todos`)
            .set('Authorization', localStorage.getToken())
            .then((response) => {
              dispatch(todosSuccess(response.body));
            }).catch((err) => {
              dispatch(todosFailure(err));
            })
        }).catch((err) => {
          throw err
        })
    );
  };
}
export function addTodo(todo) {
  return (dispatch) => {
      return request
        .post(`${config.base_url}todos`)
        .set('Authorization', localStorage.getToken())
        .send(todo)
        .then((response) => {
          request
            .get(`${config.base_url}todos`)
            .set('Authorization', localStorage.getToken())
            .then((response) => {
              dispatch(todosSuccess(response.body));
            }).catch((err) => {
              dispatch(todosFailure(err));
            })
        }).catch((err) => {
          dispatch(addTodoFailure(err));
        })
  };
}

/*
 * ----------------- Reducers -------------------
 */

const initialState = {
  todoItems: [],
  requestedAt: null,
  error: null,
}

export default function authReducer(state=initialState, action) {
  switch(action.type) {
    case types.TODOS_REQUEST:
    return Object.assign({}, state, {
      requestedAt: action.requestedAt
     })
     case types.TODOS_SUCCESS:
     return Object.assign({}, state, {
       error: null,
       todoItems: action.todos
     })
     case types.TODOS_FAILURE:
     return Object.assign({}, state, {
       error: action.error,
     })
     case types.UPDATE_TODO_REQUEST:
     return Object.assign({}, state, {
       requestedAt: action.requestedAt
      })
      case types.ADD_TODO_FAILURE:
      case types.UPDATE_TODO_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
      })

     default:
      return state
  }
}
