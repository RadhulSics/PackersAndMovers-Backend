const mongoose= require("mongoose");

const mSchema=mongoose.Schema({
   mover_id:{
        type:mongoose.Types.ObjectId,
        ref:'movers',
        required:true
    }, 
     minRate:{
        type:Number,
        required:true
    }, ratePerKm:{
        type:Number,
        required:true
    }, ratePerKg:{
        type:Number,
        required:true
    },comments:{
        type:String
    }
});
module.exports=mongoose.model('moverrates',mSchema)

