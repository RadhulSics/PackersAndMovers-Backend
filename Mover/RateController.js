const rates=require('./rateSchema')

const addRate=(req,res)=>{
    const rate1=new rates({
        mover_id:req.params.mover_id,
        ratePerKg:req.body.ratePerKg,
        ratePerKm:req.body.ratePerKm,
        minRate:req.body.minRate,
        comments:req.body.comments
        
        
    })
    rate1.save().then(data=>{
        res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
}
//rate Registration -- finished

//View all rate by mover

const viewRatesByMover=async(req,res)=>{
    console.log(req.params.mover_id);
    rates.find({mover_id:req.params.mover_id}).exec()
    .then(data=>{

      if(data.length>0){
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    }else{
      res.json({
        status:200,
        msg:"No Data obtained "
    })
    }
  }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Inserted",
          Error:err
      })
  })
  
  }

  
//update Mover by id
const editRateById=(req,res)=>{

  
    rates.findOneAndUpdate({mover_id:req.params.id},{
        ratePerKg:req.body.ratePerKg,
        ratePerKm:req.body.ratePerKm,
        minRate:req.body.minRate,
        comments:req.body.comments
      })
  .exec().then(data=>{
    res.json({
        status:200,
        msg:"Updated successfully"
    })
  }).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }
  
  
module.exports={addRate,viewRatesByMover,editRateById}