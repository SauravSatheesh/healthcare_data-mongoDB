import React,{useState,useEffect, useContext} from 'react';
import {AuthContext} from '../authContext/authState';

export const Alert = () => {
  const [show, setShow] = useState(true);
  const {message}=useContext(AuthContext);
  useEffect(() => {
    
    setTimeout(() => {
    
      setShow(false);
    }, 1500)},[]) ;
 
 
 
    return (
  <>{show?     
<div className="bg-yellow-200 border-yellow-600 text-yellow-600 border-l-4 p-2" role="alert">
    <p className="font-bold">
       {message.message}
     
    </p>
   
</div>:null}
</>
    )
}
