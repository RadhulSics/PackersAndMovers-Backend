const mongoose= require("mongoose");

const moverSchema=mongoose.Schema({
   name:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    city:{
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
    district:{
        type:String,
        required:true
    },regno:{
        type:String,
        required:true
    },
    aadhar:{
        type:Number,
        required:true
    }, rating:{
        type:Number,
        default:0,
        required:true
    }, status:{
        type:Boolean,
        default:false,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    reviews:{
        type:Array
    } ,
    isactive:{
        type:Boolean,
        default:false
    }
});
module.exports=mongoose.model('movers',moverSchema)

