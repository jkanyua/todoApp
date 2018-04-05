import request from 'superagent';
import { config } from '../config'
import * as localStorage from '../utils'
/*
 * ----------------- Action Types -------------------
 */

export const types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

  REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST',
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  REGISTER_USER_FAILURE: 'REGISTER_USER_FAILURE'
}

/*
 * ----------------- Action Creators -------------------
 */
function loginRequest(requestedAt) {
  return {
    type: types.LOGIN_REQUEST,
    requestedAt
  }
}

function loginSuccess(token){
  return {
    type: types.LOGIN_SUCCESS,
    token,
    isLoggedIn: true
  }
}

function loginFailure(err){
  return {
    type: types.LOGIN_FAILURE,
    error: err.body.message,
    isLoggedIn: false
  }
}


export function login(creds) {
  return (dispatch) => {
    const requestedAt = Date.now()
    dispatch(loginRequest(requestedAt));
    return (
      request
        .post(`${config.base_url}user/login`)
        .send(creds)
        .then((response) => {
          localStorage.setToken(response.body.token);
          dispatch(loginSuccess(response.body));
        }).catch((err) => {
          dispatch(loginFailure(err.response));
        })
    );
  };
}


// Register User

function registerRequest(requestedAt) {
  return {
    type: types.REGISTER_USER_REQUEST,
    requestedAt
  }
}

function registerSuccess() {
  return {
    type: types.REGISTER_USER_SUCCESS,
    registered: true
  }
}

function registerFailure(err) {
  return {
    type: types.REGISTER_USER_FAILURE,
    registered: false,
    error: err.body.message
  }
}

export function register(newUser) {
  return (dispatch) => {
    const requestedAt = Date.now()
    dispatch(registerRequest(requestedAt));
    return (
      request
        .post(`${config.base_url}user`)
        .send(newUser)
        .then((response) => {
          dispatch(registerSuccess());
        }).catch((err) => {
          dispatch(registerFailure(err.response));
        })
    );
  };
}

/*
 * ----------------- Reducers -------------------
 */

 const initialState = {
   isLoggedIn: false,
   requestedAt: null,
   error: null,
   registered: false
 }

 export default function authReducer(state=initialState, action) {
   switch(action.type) {
     case types.LOGIN_REQUEST:
     return Object.assign({}, state, {
       requestedAt: action.requestedAt
      })
      case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.token,
        isLoggedIn: action.isLoggedIn,
        error: null
      })
      case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isLoggedIn: action.isLoggedIn,
      })
      case types.REGISTER_USER_REQUEST:
      return Object.assign({}, state, {
        requestedAt: action.requestedAt
       })
      case types.REGISTER_USER_SUCCESS:
       return Object.assign({}, state, {
         registered: action.registered,
         error: null
       })
      case types.REGISTER_USER_FAILURE:
       return Object.assign({}, state, {
         error: action.error,
         registered: action.registered,
       })
      default:
       return state
   }
 }
 