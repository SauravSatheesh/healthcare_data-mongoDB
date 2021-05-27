const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const patientSchema=new Schema({
first_name:{
    type:String,
    text:true
},
last_name:{
    type:String,
    text:true
},
email:{
    type:String,
    text:true
},
phone:{
    type:String,
    text:true
}

});

module.exports = mongoose.model("Patient",patientSchema);