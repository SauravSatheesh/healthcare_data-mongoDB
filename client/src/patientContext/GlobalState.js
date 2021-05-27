import React,{createContext,useReducer} from 'react';
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/ActionTypes';
import AppReducer from './AppReducer';
import * as api from '../api/index';



const initialState={
patients:[],


};
export const GlobalContext=createContext(initialState);

export const GlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(AppReducer,initialState);
    //Actions
     const getPatients= async () => {
      const config = {
        'Content-Type': 'application/json'
      }  
      try {
          const  {data}  = await api.fetchPatients(config);
          dispatch({ type: FETCH_ALL, payload: data });
         } catch (error) {
          console.log(error.message);
        }
      };
      
      const deletePatient=async(id)=>{
        const config = {
          'Content-Type': 'application/json'
        }
        try {
          await api.deletePatient(id,config);
          dispatch({type:DELETE,payload:id});
        } catch (error) {
         console.log(error.message); 
        }
      }
      
     
    const addPatient=async(patient)=>{
      const config = {
        'Content-Type': 'application/json'
      }
      try {
        const {data}=await api.addPatient(patient,config);
        dispatch({type:CREATE,payload:data})
      } catch (error) {
        console.log(error.message)
      }
    }

    const updatePatient=async(id,patient)=>{
      const config = {
        'Content-Type': 'application/json'
      }
      try {
        const {data}=await api.updatePatient(id,patient,config);
        dispatch({type:UPDATE,payload:data})
      } catch (error) {
        console.log(error.message);
      }
    }
    
    return(
        <GlobalContext.Provider value={{
          patients:state.patients,
          getPatients,
          deletePatient,
          addPatient,
          updatePatient,
          dispatch
}}>
            {children}
        </GlobalContext.Provider>
    );

      }