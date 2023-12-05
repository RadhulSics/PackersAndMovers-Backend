const complaintSchema=require('./complaintSchema')
//add a complaint


const registerComplaint=(req,res)=>{
    let date=new Date()
      const newcomplaint=new complaintSchema({
        pid:req.body.pid,
        mid:req.body.mid,
     complaint:req.body.complaint,
     date:date
          
      })
      newcomplaint.save().then(data=>{
          res.json({
              status:200,
              msg:"added successfully",
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
    
    //view Complaint details for mover
const viewComplaintByMId=(req,res)=>{
    complaintSchema.find({mid:req.params.id}).populate('pid').exec()
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

      //view Complaint details for admin
const viewAllComplaint=(req,res)=>{
    complaintSchema.find().sort({date: -1})
    .populate('pid')
    .populate('mid').exec()
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
  

  module.exports={registerComplaint,viewComplaintByMId,viewAllComplaint}