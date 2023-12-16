
const LuggageSchema = require('../Packer/LuggageSchema')
const drivers=require('./driverSchema')
const locationupdates=require('./locationUpdateSchema')

const registerDriver=(req,res)=>{
  console.log(req.body.name);
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
    drivers.find().populate('mid').exec()
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
  
  
  //View  driver by id
  
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
  
 //View  driver by  mover id
  
 const viewDriverByMId=(req,res)=>{
  drivers.find({mid:req.params.id}).exec()
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
  //accept Drivers by id
  const acceptorderbyDriverId=async(req,res)=>{
      let date=new Date()
      console.log(req.body.driverid);
      console.log("req",req.params.id);

    await LuggageSchema.findByIdAndUpdate({_id:req.params.id},
        {
          driverstatus:"accepted",
          driverid:req.body.driverid
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
  let newDriverUpdate=new locationupdates({
    driverid:req.body.driverid,
    date:date,
    orderid:req.params.id

  })
  await newDriverUpdate.save().then(data=>{
    console.log("data saved");
  })
  .catch(err=>{
    console.log("err on loc updates",err);
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
//View all orders for drivers
  
  const viewPendingOrdesForDrivers=(req,res)=>{
    LuggageSchema.find({mid:req.params.id,driverstatus:"Pending"}).exec()
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
  
  const viewAcceptedOrders=(req,res)=>{
    locationupdates.find({driverid:req.params.id,isactive:true}).populate('orderid').exec()
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
  // const updateLocByDriver=(req,res)=>{
  //   let isactive=true
  //   console.log("rew",req.body.location);
  //   if(req.body.status=="Delivered")
  //   isactive=false
  //   locationupdates.findByIdAndUpdate({_id:req.params.id},{
  //      $push: { location: req.body.location } ,
  //     status:req.body.status,
  //     comments:req.body.comments,
  //     isactive:isactive

  //   }).exec()
  //   .then(data=>{
      
  //     res.json({
  //         status:200,
  //         msg:"Data obtained successfully",
  //         data:data
  //     })
  // }).catch(err=>{
  //   console.log(err);
  //     res.json({
  //         status:500,
  //         msg:"Data not Inserted",
  //         Error:err
  //     })
  // })

  // }
  
const updateLocByDriver = (req, res) => {
  let isactive = true;
  console.log("req", req.body.location);

  if (req.body.location.status == "Delivered") {
    isactive = false;
  }

  locationupdates
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: { location: req.body.location }, // Use "location" to match your schema
       status:req.body.location.status,
        comments: req.body.comments,
        isactive: isactive,
      },
      { new: true } // This option ensures that the updated document is returned
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
  const testApi=(req,res)=>{
    console.log(req.body.id);
  }
  const viewCurrentLocationUpdatesByDriverid=(req,res)=>{
    locationupdates.find({driverid:req.body.driverid,isactive:true}).populate('orderid').exec()
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

  const viewAllLocationUpdatesByDriverid=(req,res)=>{
    locationupdates.find({driverid:req.body.driverid}).populate('orderid').exec()
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
  const viewAllLocationUpdatesByMoverid=(req,res)=>{
    locationupdates.find({mid:req.body.mid}).populate('orderid').populate('driverid').exec()
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

  const viewCurrentLocationUpdatesByMoverid=(req,res)=>{
    locationupdates.find({mid:req.body.mid,isactive:true}).populate('driverid').populate('orderid').exec()
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

  
const getLocUpdatesById=(req,res)=>{
  locationupdates.findById(req.params.id).exec()
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
module.exports={registerDriver,deleteDriverById,editDriverById,viewDriverById,viewDrivers,
  loginDriver,
  acceptorderbyDriverId,
  viewPendingOrdesForDrivers,
  viewDriverByMId,
  viewAcceptedOrders,
  updateLocByDriver,
  testApi,
  viewCurrentLocationUpdatesByDriverid,
  viewAllLocationUpdatesByDriverid,
  viewCurrentLocationUpdatesByMoverid,
  viewAllLocationUpdatesByMoverid,
  getLocUpdatesById
}