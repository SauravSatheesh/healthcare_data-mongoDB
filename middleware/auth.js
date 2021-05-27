require("dotenv").config();
const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
  const token=req.header("x-auth-token");
  if(!token)
 {return res.status(401).json({message:"No token,Authorization denied"});}
 else{ 
 try {
      const decoded= jwt.verify(token,process.env.jwtSecret);
      req.client=decoded;
      next();
  } catch (error) {
      res.status(400).json({message:"Token is not valid"});
  }
 }
}