import axios from 'axios';

export const fetchPatients=(config)=>axios.get(`/api/patients`,config);
export const deletePatient=(id,config)=>axios.delete(`/api/patients/${id}`,config);
export const addPatient=(patient,config)=>axios.post(`/api/patients/create`,patient,config);
export const updatePatient=(id,patient,config)=>axios.put(`/api/patients/update/${id}`,patient,config);
export const loginUser=(user,config)=>axios.post(`/api/clients/login`,user,config);
export const registerUser=(user,config)=>axios.post(`/api/clients/register`,user,config);
export const getUser=(config)=>axios.get(`/api/clients`,config);
