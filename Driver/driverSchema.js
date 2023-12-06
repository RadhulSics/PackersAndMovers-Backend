const mongoose= require("mongoose");

const driverSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    contact:{
        type:Number,
        required:true
    },
  
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },
   gender:{
        type:String,
        required:true
    },
    mid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'movers'
    },
    licenceNo:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('drivers',driverSchema)

