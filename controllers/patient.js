const mongoose=require("mongoose");
const Patient= require("../models/patient");

exports.getPatients=async(req,res)=>{
    try {
        const patient =await Patient.find();
        res.status(200).json(patient);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

exports.addPatient = async(req,res)=>{
    const patientDetails=req.body;
    const newPatient = new Patient(patientDetails);
    try {
        await newPatient.save();
       
        res.status(200).json(newPatient);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

exports.updatePatient = async(req,res)=>{
const id =req.params.id; 
const newDetails={
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    phone:req.body.phone}   
try {
const patient= await Patient.findByIdAndUpdate(id,newDetails);
 res.status(200).json(patient);
} catch (error) {
    res.status(404).json({message:"No patient with this id"});
}
}

exports.deletePatient = async(req,res)=>{
    const id =req.params.id;
    try {
        await Patient.findByIdAndDelete(id);
        res.status(200).json({message:"Patient details deleted successfully"})
    } catch (error) {
       res.status(404).json({message:"No patient with this id "}) 
    }
}

