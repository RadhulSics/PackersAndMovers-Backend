
const luggage=require('./LuggageSchema')
const packers=require('./packerSchema')
const rates=require('../Mover/rateSchema')
const jwt=require('jsonwebtoken')
const locationUpdateSchema = require('../Driver/locationUpdateSchema')
//Packer Registration 

const registerPacker=(req,res)=>{
    const newPackers=new packers({
        name:req.body.name,
        gender:req.body.gender,
        city:req.body.city,
        district:req.body.district,
        contact:req.body.contact,
        email:req.body.email,
        password:req.body.password,
        pincode:req.body.pincode
    })
    newPackers.save().then(data=>{
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
//Packer Registration -- finished

//Login Donor 
const secret = 'your-secret-key'; // Replace this with your own secret key

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

const login = (req, res) => {
  const { email, password } = req.body;

  packers.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

      if (user.password!=password) {
        return res.status(500).json({ message: 'Something went wrong' });
      }

    //   if (user.password!=password) {
    //     return res.status(400).json({ message: 'Invalid credentials' });
    //   }

      const token = createToken(user);

      res.status(200).json({ user, token });
    });
  
};
//validate
//const secret = 'your-secret-key'; // Replace this with your own secret key

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  console.log("t1",token);
  console.log("secret",secret);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' ,err:err});
    }

    req.user = decodedToken.userId;
    next();
    return res.status(200).json({ message: 'ok' ,user:decodedToken.userId});
  });
  console.log(req.user);
};




//Login packers --finished


//View all packers

const viewPackers=(req,res)=>{
  packers.find().exec()
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

// view Packers finished


//View all packers

const viewPackerById=(req,res)=>{
  packers.findById({_id:req.params.id}).exec()
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

// view Packers finished

//update Packer by id
const editPackerById=(req,res)=>{

  // let data1=requireAuth(req,res)
  // console.log(data1);
    
  packers.findByIdAndUpdate({_id:req.params.id},{
    name:req.body.name,
    gender:req.body.gender,
    city:req.body.city,
    district:req.body.district,
    contact:req.body.contact,
    email:req.body.email,
    pincode:req.body.pincode
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


//Packer forgot password
const forgotPassword=(req,res)=>{
  packers.findOne({email:req.body.email}).exec()
  .then(data=>{
    if(data==null){
      res.json({
        status:500,
        msg:"User not Found"
    })
    }
    else{
      packers.findOneAndUpdate({email:req.body.email},{
        password:req.body.password
      }).exec().then(data=>{
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
  })
}
//finished -- forgot password

// del Packer by id
const deletePackerById=(req,res)=>{
  packers.findByIdAndDelete({_id:req.params.id}).exec()
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

const addLuggage=async(req,res)=>{
  //getting mover charges
  let date=new Date()
  
  let flag=0
  let dt=new Date((req.body.date))
  
    if(((((dt).getMonth()))>date.getMonth()))
    flag=1
    else if((((((dt).getMonth()))==date.getMonth()))&&(dt).getDate()>date.getDate())
     flag=1
    console.log("mont",(((dt).getMonth())),"",date.getMonth(),"",(dt));
  
   
  console.log("flag",flag);  
  if(flag==1){
  rates.findOne({mover_id:req.body.mid}).exec()
  .then(data=>{
  
    let rate=0
    let type=req.body.type,vehicle=req.body.vehicle;
    let boxes=req.body.boxes
    let weight=req.body.weight
    let distance=req.body.distance
  
      switch(type){
        case '1rk':rate+=2000
                    break
        case '2bhk':rate+=3000
                    break  
        case '3bhk':rate+=4000
                    break 
        case '3bhk+':rate+=5000
                    break        
      }
      console.log("rate sw:",rate)
      if(vehicle){
        rate+=3000
      }
      console.log("rate veh:",rate)
      if(boxes>0){
        rate+=weight*data.ratePerKg
        console.log("data.ratePerKg:",data.ratePerKg)
      }
      console.log("rate wt:",rate)
      if(distance>5)
      rate+=distance*data.ratePerKm
      else
      rate+=data.minRate
  if(req.body.godownDays>0)
      rate+=(req.body.godownDays*1000)
  
      console.log("rate :",rate);
    const luggage1=new luggage({
        pid:req.body.pid,
        mid:req.body.mid,
        fromcity:req.body.fromcity,
        fromlmark:req.body.fromlmark,
        fromstreet:req.body.fromstreet,
        fromdistrict:req.body.fromdistrict,
        fromhname:req.body.fromhname,
        tocity:req.body.tocity,
        tolmark:req.body.tolmark,
        todistrict:req.body.todistrict,
        tostreet:req.body.tostreet,
        tohname:req.body.tohname,
        boxes:req.body.boxes,
        vehicle:req.body.vehicle,
        weight:req.body.weight,
        distance:req.body.distance,
        comments:req.body.comments,
        date:req.body.date,
        time:req.body.time,
        type:req.body.type,
        rate:rate,
        godownDays:req.body.godownDays
    })
    luggage1.save().then(data=>{
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
  
  
  })
  .catch(err=>{
    res.json({
      status:500,
      msg:"No Mover found",
      Error:err
  })
  })
  }
  else{
    res.json({
      status:500,
      msg:"choose valid date"
    })
  }
  }

// const addLuggage=(req,res)=>{
// //getting mover charges


// rates.findOne({mover_id:req.body.mid}).exec()
// .then(data=>{

//   let rate=0
//   let type=req.body.type,vehicle=req.body.vehicle;
//   let boxes=req.body.boxes
//   let weight=req.body.weight
//   let distance=req.body.distance

//     switch(type){
//       case '1rk':rate+=2000
//                   break
//       case '2bhk':rate+=3000
//                   break  
//       case '3bhk':rate+=4000
//                   break 
//       case '3bhk+':rate+=5000
//                   break        
//     }
//     console.log("rate sw:",rate)
//     if(vehicle){
//       rate+=3000
//     }
//     console.log("rate veh:",rate)
//     if(boxes>0){
//       rate+=weight*data.ratePerKg
//       console.log("data.ratePerKg:",data.ratePerKg)
//     }
//     console.log("rate wt:",rate)
//     if(distance>5)
//     rate+=distance*data.ratePerKm
//     else
//     rate+=data.minRate
// if(req.body.godownDays>0)
//     rate+=(req.body.godownDays*1000)

//     console.log("rate :",rate);
//   const luggage1=new luggage({
//       pid:req.body.pid,
//       mid:req.body.mid,
//       fromcity:req.body.fromcity,
//       fromlmark:req.body.fromlmark,
//       fromstreet:req.body.fromstreet,
//       fromdistrict:req.body.fromdistrict,
//       fromhname:req.body.fromhname,
//       tocity:req.body.tocity,
//       tolmark:req.body.tolmark,
//       todistrict:req.body.todistrict,
//       tostreet:req.body.tostreet,
//       tohname:req.body.tohname,
//       boxes:req.body.boxes,
//       vehicle:req.body.vehicle,
//       weight:req.body.weight,
//       distance:req.body.distance,
//       comments:req.body.comments,
//       date:req.body.date,
//       time:req.body.time,
//       type:req.body.type,
//       rate:rate,
//       godownDays:req.body.godownDays
//   })
//   luggage1.save().then(data=>{
//       res.json({
//           status:200,
//           msg:"Inserted successfully",
//           data:data
//       })
//   }).catch(err=>{
//       res.json({
//           status:500,
//           msg:"Data not Inserted",
//           Error:err
//       })
//   })


// })
// .catch(err=>{
//   res.json({
//     status:500,
//     msg:"No Mover found",
//     Error:err
// })
// })
// }

//view order details
const viewOrderById=(req,res)=>{
  luggage.findById({_id:req.params.id}).exec()
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

//delete order details
const deleteOrderById=async(req,res)=>{
  let flag=0
  await locationUpdateSchema.find({orderid:req.params.id}).then(data=>{
if(data.length>0)
flag=1
  }).catch(err=>{
console.log(err);
  })
  if(flag==0){
  luggage.findByIdAndDelete({_id:req.params.id}).exec()
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
  else{
    res.json({
      status:501,
      msg:"Sorry !! Driver is assigned with a Shipment"
  })
  }

}

//

//view order details for Packer
const viewOrderByPackerId=(req,res)=>{
  luggage.find({pid:req.params.id}).exec()
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


const trackMyLuggage=(req,res)=>{
  luggage.findById({_id:req.params.id},{loc:1}).exec()
  .then(data=>{
    
    res.json({
        status:200,
        msg:"Data Updated successfully",
        data:data
    })
  
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not obtained",
        Error:err
    })
})

}


module.exports={registerPacker,viewPackerById,login,viewPackers,forgotPassword,deletePackerById,
  editPackerById,viewOrderByPackerId,requireAuth,addLuggage,viewOrderById,deleteOrderById,trackMyLuggage}