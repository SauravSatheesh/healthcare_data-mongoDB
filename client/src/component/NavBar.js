import React,{ useContext,Fragment } from 'react';
import {AuthContext} from '../authContext/authState';
import { Disclosure } from '@headlessui/react';
import {Link} from 'react-router-dom';


export const NavBar = () => {
  const {logout,clearErrors,isAuthenticated}= useContext(AuthContext); 
  const handleSubmit=()=>{
   logout();
   clearErrors();
  }
  
  
  return (
        <Disclosure as="nav" className="bg-gray-800">
     
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
             
              <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block  h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                 <h1  className="text-gray-50 dark:text-gray-200 text-2xl font-bold ml-2 tracking-wide">Healthcare Data</h1>
                </div>
                <div className="hidden sm:block sm:ml-6">
                 
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                   {isAuthenticated?               
                      <Link onClick={()=>handleSubmit()}to="/" className="font-medium text-gray-50 hover:text-indigo-500">
                Logout
                </Link>:null}
               
                
              </div>
            </div>
          </div>

        
        </>
     
    </Disclosure>
  )
}