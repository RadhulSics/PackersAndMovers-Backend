const mongoose= require("mongoose");


const locationSchema = new mongoose.Schema({
    loc: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
    status:{
        type: String,
        default: null
    }
  });


const locSchema=mongoose.Schema({
    location:
  [locationSchema]
    ,
    status:{
        type: String,
        default: null
    },
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
    },
    status:{
        type:String,
        default:'Order Confirmed'

    },
    comments:{
        type:String,
        default:null
    },
    isactive:{
        type:Boolean,
        default:true
    }
});
module.exports=mongoose.model('locationupdates',locSchema)

