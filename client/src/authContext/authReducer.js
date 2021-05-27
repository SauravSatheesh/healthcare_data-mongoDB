import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_ERRORS,
    CLEAR_ERRORS
  } from '../constants/ActionTypes';


// eslint-disable-next-line import/no-anonymous-default-export
export default (state,action)=>{
    switch(action.type){
        case GET_ERRORS:
               
        return{
                message:action.payload.message,
                status:action.payload.status,
                id:action.payload.id
            };
        case CLEAR_ERRORS:
            return{
                message:{},
                status:null,
                id:null
            } ;
         case USER_LOADING:
              return{
                  ...state,
                  isLoading:true
              };
        case USER_LOADED:
            return{
               ...state,
               isAuthenticated:true,
               isLoading:false,
               client:action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            
            return{
                ...state,
               ...action.payload,
                isAuthenticated:true,
                isLoading:false
                
            }; 
            case AUTH_ERROR:
            case LOGOUT_SUCCESS:
            case LOGIN_FAIL:
            case REGISTER_FAIL:
                 localStorage.removeItem('token');   
            return{
                ...state,
                token:null,
                client:null,
                isAuthenticated:false,
                isLoading:false
                };            
        
        
         default:
            return state      
    }
}