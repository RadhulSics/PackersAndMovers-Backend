
const drivers=require('./driverSchema')
const locationupdates=require('./locationUpdateSchema')

const registerDriver=(req,res)=>{
    const newDriver=new drivers({
        name:req.body.name,
        gender:req.body.gender,
        mid:req.body.mid,
        licenceNo:req.body.licenceNo,
        contact:req.body.contact,
        email:req.body.email,
        password:req.body.password
    })
    newDriver.save().then(data=>{
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
//Driver Registration -- finished



//View all Drivers

const viewDrivers=(req,res)=>{
    drivers.find().exec()
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
  
  // view drivers finished
  
  
  //View all drivers
  
  const viewDriverById=(req,res)=>{
    drivers.findById({_id:req.params.id}).exec()
    .then(data=>{
      
      res.json({
          status:200,
          msg:"Data obtained successfully",
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
  
  // view Drivers finished
  
  //update Drivers by id
  const editDriverById=(req,res)=>{
      
    drivers.findByIdAndUpdate({_id:req.params.id},
        {
        name:req.body.name,
        gender:req.body.gender,
        mid:req.body.mid,
        licenceNo:req.body.licenceNo,
        contact:req.body.contact,
        email:req.body.email,
        password:req.body.password
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
  
  
  // del drivers by id
  const deleteDriverById=(req,res)=>{
    drivers.findByIdAndDelete({_id:req.params.id}).exec()
    .then(data=>{
      
      res.json({
          status:200,
          msg:"Data obtained successfully",
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

//Login
const loginDriver = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    drivers
      .findOne({ email: email })
      .exec()
      .then((data) => {
        if (password == data.password) {
          res.json({
            status: 200,
            msg: "Login successfully",
            data: data,
          });
        } else {
          res.json({
            status: 500,
            msg: "password Mismatch",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "User not found",
          Error: err,
        });
      });
  };
  
  //Login  --finished

  
module.exports={registerDriver,deleteDriverById,editDriverById,viewDriverById,viewDrivers,loginDriver}