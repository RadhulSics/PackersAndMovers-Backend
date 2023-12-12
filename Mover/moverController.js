
const movers=require('./moverSchema')
const booking=require('../Packer/LuggageSchema')
const jwt=require('jsonwebtoken')
const luggage=require('../Packer/LuggageSchema')
const secret = 'your-secret-key';
//Movers Registration

const registerMover=(req,res)=>{
    const newMovers=new movers({
        name:req.body.name,
        regno:req.body.regno,
        aadhar:req.body.aadhar,
        city:req.body.city,
        district:req.body.district,
        contact:req.body.contact,
        email:req.body.email,
        password:req.body.password,
        pincode:req.body.pincode
        
    })
    newMovers.save().then(data=>{
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
//Movers Registration -- finished
//login


const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

const login = (req, res) => {
  const { email, password } = req.body;

  movers.findOne({ email }, (err, user) => {
    if (err) {
      return res.json({ message: 'Something went wrong' });
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

//   console.log(decodedToken)


//end validate

//View all Mover

const viewMovers=(req,res)=>{
  movers.find({isactive:true}).exec()
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
      msg:"No Data obtained ",
      data:data
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

// view Mover finished


//update Mover by id
const editMoversById=(req,res)=>{

  
  movers.findByIdAndUpdate({_id:req.params.id},{
    name:req.body.name,
    regno:req.body.regno,
    aadhar:req.body.aadhar,
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


//Mover forgot password
const forgotPassword=(req,res)=>{
  movers.findOne({email:req.body.email}).exec()
  .then(data=>{
    if(data==null){
      res.json({
        status:500,
        msg:"User not Found"
    })
    }
    else{
      movers.findOneAndUpdate({email:req.body.email},{
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

// del Mover by id
const deleteMoverById=(req,res)=>{
  movers.findByIdAndDelete({_id:req.params.id}).exec()
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


// View Mover by id
const showMoverById=(req,res)=>{
  movers.findById({_id:req.params.id}).exec()
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


// View packer bookings by id
const showBookingReqs=(req,res)=>{
  booking.find({mid:req.params.id,status:'pending'}).populate('pid').exec()
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

//update payment

const generatePayment=(req,res)=>{
  luggage.findByIdAndUpdate({_id:req.params.id},{
    paymenttype:req.body.paymenttype,
    paymentStatus:req.body.paymentStatus
  }).exec()
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

// add reviews to mover by  packerid
const addReview=(req,res)=>{
  let review=req.body.review
  let arr=[]
  movers.findById({_id:req.body.id}).exec()
  .then(data=>{
  arr=data.reviews
  arr.push(review)
  console.log(arr);
  movers.findByIdAndUpdate({_id:req.body.id},{
    reviews:arr
  }).exec()
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
})
}


// add rating to mover by  packerid
const addRating=(req,res)=>{
  let newRate=parseInt(req.body.rating)
  let rating=0
  movers.findById({_id:req.body.id}).exec()
  .then(data=>{
    rating=data.rating
    if(data.rating!=0)
  rating=(rating+newRate)/2
  else
  rating=newRate
  console.log(rating);
  movers.findByIdAndUpdate({_id:req.body.id},{
    rating:rating
  }).exec()
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
})
}




//view order details for Movers
const viewAcceptedOrderByMoverId=(req,res)=>{
  luggage.find({mid:req.params.id,status:"approved"}).exec()
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

//View all  Mover requests

const viewMoverRequests=(req,res)=>{
  movers.find({isactive:false}).exec()
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
        msg:"Data not obtained",
        Error:err
    })
})

}
//Mover Approval by admin
const ApproveMover=(req,res)=>{

    
  movers.findByIdAndUpdate({_id:req.params.id},{
    isactive:true
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




const approveOrder=(req,res)=>{
  luggage.findByIdAndUpdate({_id:req.params.id},
    {
    status:"approved"}).exec()
  .then(data=>{
    
    res.json({
        status:200,
        msg:"Data Updated successfully"
    })
  
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Inserted",
        Error:err
    })
})

}

const rejectOrder=(req,res)=>{
  luggage.findByIdAndUpdate({_id:req.params.id},
    {
    status:"rejected"}).exec()
  .then(data=>{
    
    res.json({
        status:200,
        msg:"Data Updated successfully"
    })
  
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Inserted",
        Error:err
    })
})

}
module.exports={registerMover,login,requireAuth,viewMovers,showMoverById,editMoversById,forgotPassword,deleteMoverById,
showBookingReqs,addReview,addRating,generatePayment,viewAcceptedOrderByMoverId,viewMoverRequests,ApproveMover,
approveOrder,rejectOrder}