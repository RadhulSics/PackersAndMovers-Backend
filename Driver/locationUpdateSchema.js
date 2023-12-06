const mongoose= require("mongoose");

const locSchema=mongoose.Schema({
    location:
        [{
            loc:{
                type:String
                
            },
            date:{
                type:Date
            }
        }]
    ,
    
    driverid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'drivers'
    },
  
    status:{
        type:String,
        required:"Not Picked up"
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

