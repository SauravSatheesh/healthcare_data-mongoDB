const express= require("express");
const mongoose= require("mongoose");
const path=require("path");
const routerPatient=require("./routes/patient");
const routerClient=require("./routes/client");
const cors = require("cors");
require("dotenv").config();

const app=express();

app.use(cors());
app.use(express.json());
app.use('/api/patients',routerPatient);
app.use('/api/clients',routerClient);

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'/client/build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}
const PORT =process.env.PORT||5000;
const url=process.env.mongoURL;


mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
         .then(()=>app.listen(PORT,()=>console.log(`Server connected to port:http://localhost:${PORT}`)))
         .catch((error)=>console.log(`${error} did not connect`));