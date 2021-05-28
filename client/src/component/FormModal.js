import React, { Fragment, useRef, useState, useContext, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {GlobalContext} from '../patientContext/GlobalState';

export const FormModal = ({ currentId, setCurrentId, edit, setEdit,add,setAdd,history }) => {
    const {addPatient,updatePatient,patients,getPatients}=useContext(GlobalContext);
    const patient=(currentId?patients.find((message)=>message._id===currentId):null);
    const [patientData,setPatientData]=useState({first_name:'',last_name:'',email:'',phone:''});
    const [open, setOpen] = useState(true);
    const cancelButtonref = useRef(null);

    useEffect(()=>{
        if(patient) {setPatientData(patient);}
    },[patient]);

   
    
    const  handleSubmit= async(e) => {
        e.preventDefault();
        if(currentId){
            setEdit(prev=>!prev);
            updatePatient(currentId,patientData);
            clear();
            getPatients();
               }
        else{
        setAdd(prev=>!prev);
        addPatient(patientData);
        clear();
        }

    }
    const closeModal = () => {
       if(currentId)
        {setEdit(!edit);}
       else{
           setAdd(!add);
       }
    }

    const clear=()=>{
        setCurrentId(0);
        setPatientData({first_name:'',last_name:'',email:'',phone:''})
    }
    return (
        <>{(add||edit) ?
            <Transition.Root show={open} as={Fragment}>

                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonref}
                    open={open}
                    onClose={setOpen}
                >
                    <main className="antialiased bg-gray-200 text-gray-900 font-sans overflow-x-hidden bg-opacity-75">

                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" >
                           


                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" >
                                &#8203;
                  </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full " >
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            </div> */}
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                              {currentId?'Edit the Patient details':'Add the Patient details'}
                            </Dialog.Title>
                                                <form  className="mb-4 w-full md:mb-0 ">
                                                    <label className="" htmlFor="search-form">First Name</label>
                                                    <input className="bg-grey-lightest border-2 focus:border-orange p-1 rounded-lg shadow-inner w-full"  type="text" value={patientData.first_name} onChange={(e)=>setPatientData({...patientData,first_name:e.target.value})}/>

                                                    <label className="" htmlFor="search-form">Last Name</label>
                                                    <input className="bg-grey-lightest border-2 focus:border-orange p-1 rounded-lg shadow-inner w-full" type="text" value={patientData.last_name}onChange={(e)=>setPatientData({...patientData,last_name:e.target.value})}/>

                                                    <label className="" htmlFor="search-form">E-mail</label>
                                                    <input className="bg-grey-lightest border-2 focus:border-orange p-1 rounded-lg shadow-inner w-full"  type="text"value={patientData.email}onChange={(e)=>setPatientData({...patientData,email:e.target.value})} />

                                                    <label className="" htmlFor="search-form">Phone Number</label>
                                                    <input className="bg-grey-lightest border-2 focus:border-orange p-1 rounded-lg shadow-inner w-full" type="text" value={patientData.phone}onChange={(e)=>setPatientData({...patientData,phone:e.target.value})} />



                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={(e) => handleSubmit(e)}
                                        >
                                            {currentId?'Edit':'Add'}
                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => closeModal()}
                                            ref={cancelButtonref}
                                        >
                                            Cancel
                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </main>
                </Dialog>
            </Transition.Root> : null}
        </>
    )
}
