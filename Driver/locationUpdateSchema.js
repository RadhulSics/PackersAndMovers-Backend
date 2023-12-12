const mongoose= require("mongoose");

const locSchema=mongoose.Schema({
    location:
   {
    type:String,
    default:null
   }
    ,
    
    driverid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'drivers'
    },
  
    date:{
        type:Date,
        required:true
    },
    arrivaldate:{
        type:Date,
        default:null
    },
    orderid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'pluggages'
    }
});
module.exports=mongoose.model('locationupdates',locSchema)

