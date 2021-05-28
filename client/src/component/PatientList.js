import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authContext/authState';
import { GlobalContext } from '../patientContext/GlobalState';
import { DeleteModal } from './DeleteModal';
import { FormModal } from './FormModal';

export const PatientList = () => {
    const [currentId, setCurrentId] = useState(0);
    const [display, setDisplay] = useState(false);
    const [edit, setEdit] = useState(false);
    const [add,setAdd]=useState(false);
    const { getPatients, patients } = useContext(GlobalContext);
    const {loadUser,isAuthenticated} =useContext(AuthContext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {loadUser();getPatients(); }, []);
   

    const Edit = (id) => {
        setEdit(prev => !prev);
        setCurrentId(id)
    }

    const openModal = (id) => {
        setDisplay(prev => !prev);
        setCurrentId(id)
    }

   const Add =()=>{         
       setAdd(prev=>!prev);
       
   }
   


    return (
       <> {isAuthenticated?
        <div className="w-5/6   overscroll-y-auto text-gray-50 bg-gray-500   mt-5 mx-auto sm:w-2/3 rounded">

            <div className="p-4 flex justify-between">
                <div>        
            <h1 className=" text-center text-2xl font-bold text-gray-50">Patients List</h1>
                   
                </div>
                <div>
                    <button onClick={()=>Add()}className="bg-blue-500 hover:bg-blue-700 text-gray-50 font-bold py-1 px-2 rounded">
                        +Add
</button>
               {add?
                <FormModal add={add}  setCurrentId={setCurrentId} setAdd={setAdd}/>:null}
                </div>

            </div>

            <div className="   justify-center  px-3 py-4  ">
                <table className=" text-center w-full    text-lg text-black bg-gray-50 shadow-md sm:text-left rounded mb-4  ">
                    <tbody >
                        <tr className="border-b bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                            <th className="font-sans font-bold text-2xl text-center sm:text-left  font-extrabold p-3 px-5">Details</th>
                            <th></th>
                        </tr  >
                        {patients.map(patient => {
                            return (
                                <tr className="border-b bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0  " key={patient._id}>
                                    <td className="font-serif  sm:p-3 sm:px-5 text-md  tracking-wide sm:text-sm">FirstName:{patient.first_name}<br />LastName:{patient.last_name}<br />Email:{patient.email}<br />Phone:{patient.phone}</td>
                                    <td className="w-full p-3 px-5 bg-gray-50  sm:px-6 sm:flex sm:flex-row-reverse  sm:justify-start">
                                        {/* <div className="bg-gray-50  sm:px-6 sm:flex sm:flex-row-reverse justify-center"> */}
                                        <button onClick={()=> Edit(patient._id)} type="button" className="mt-0 w-11/12 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 sm:py-2 bg-blue-500 hover:bg-blue-700 text-gray-50 font-bold  font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Edit</button>
                                        {edit?
                                        <FormModal currentId={currentId} setCurrentId={setCurrentId} edit={edit} setEdit={setEdit} />:null}
                                        <button onClick={()=> openModal(patient._id)} type="button" className="mt-0.5 w-11/12 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 sm:py-2 bg-red-500 hover:bg-red-700 text-gray-50 font-bold font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> Delete</button>
                                        {display?
                                        <DeleteModal currentId={currentId} setCurrentId={setCurrentId} display={display} setDisplay={setDisplay}/>:null}
                                         {/* </div> */}

                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>
        </div>:null}
        </>



    )
}


