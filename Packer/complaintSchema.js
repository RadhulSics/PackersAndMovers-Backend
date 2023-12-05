const mongoose= require("mongoose");
const schema=mongoose.Schema({

    pid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'packers'
    },
    mid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'movers'
    },
    date:{
            type:Date,
            required:true
    },complaint:{
        type:String,
       required:true
    }
 
});
    module.exports=mongoose.model('complaints',schema)
