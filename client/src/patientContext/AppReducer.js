import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/ActionTypes';


// eslint-disable-next-line import/no-anonymous-default-export
export default(state,action)=>{
    switch (action.type) {
        case FETCH_ALL:
            return {
                patients:action.payload,
                
            };
        case DELETE:
            return{
              ...state,
              patients:state.patients.filter(patient=>patient._id!==action.payload),
              
            };
        case CREATE:
            return{
                ...state,
              patients:[...state.patients,action.payload]
            }; 
        case UPDATE:
           return {
                ...state,
                patients:state.patients.map((patient)=>(patient._id===action.payload._id?action.payload:patient))
            }       
       

            
            
    
        default:
         return state;
    }
}