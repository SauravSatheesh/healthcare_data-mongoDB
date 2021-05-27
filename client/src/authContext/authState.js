import React,{createContext,useReducer} from 'react';
import {GET_ERRORS,CLEAR_ERRORS, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADING, USER_LOADED, AUTH_ERROR} from '../constants/ActionTypes';
import AuthReducer from './authReducer';
import * as api from '../api/index';
import setAuthToken from '../authToken/setAuthToken';


const initialState={
    message:{},
    status:null,
    id:null,
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:null,
    client:null
};

export const AuthContext=createContext(initialState);

export const AuthProvider=({children})=>{
const [state,dispatch]= useReducer(AuthReducer,initialState);

const loadUser=async()=>{
  dispatch({type:USER_LOADING});
  const config={
    'Content-Type':'application/json'
}
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  try {
    const {data}= await api.getUser(config);
    dispatch({type:USER_LOADED,payload:data});
  } catch (error) {
    returnErrors(error.response.data,error.response.status);
    dispatch({type:AUTH_ERROR});
  }
}


const login=async(user)=>{
const config={
    'Content-Type':'application/json'
}
try {
    const {data}=await api.loginUser(user,config);
    dispatch({type:LOGIN_SUCCESS,payload:data});
} catch (error) {
  returnErrors(error.response.data,error.response.status);
  dispatch({type:LOGIN_FAIL})  
}
}

const register=async(user)=>{
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const {data}=await api.registerUser(user,config);
    dispatch({type:REGISTER_SUCCESS,payload:data});
  } catch (error) {
    returnErrors(error.response.data,error.response.status);
    dispatch({type:REGISTER_FAIL});
  }

}

const logout=()=>{
 dispatch({type:LOGOUT_SUCCESS})
}
const returnErrors = (message, status, id) => {
  
  dispatch ({
      type: GET_ERRORS,
      payload: { message, status, id }
    });
  };
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };
  



return(
    <AuthContext.Provider value={{
        message:state.message,
        status:state.status,
        id:state.id,
        token:state.token,
        isAuthenticated:state.isAuthenticated,
        isLoading:state.isLoading,
        user:state.user,
        returnErrors,
        clearErrors,
        login,
        register,
        logout,
        loadUser
    }}>
        {children}
    </AuthContext.Provider>
)

}