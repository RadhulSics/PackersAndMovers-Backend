const express=require('express')
const router=express.Router()
const packercontroller=require('./Packer/packerController')
const moverController=require('./Mover/moverController')
const moverrate=require('./Mover/RateController')
const complaint=require('./Packer/compController')
const driverController=require('./Driver/driverController')


//packer  routes
router.post('/registerPacker',packercontroller.registerPacker)//done
router.post('/loginPacker',packercontroller.login)//done
router.post('/viewPackers',packercontroller.viewPackers)//done
router.post('/editPackerById/:id',packercontroller.editPackerById)//done
router.post('/viewPackerById/:id',packercontroller.viewPackerById)//done
router.post('/checkAuth',packercontroller.requireAuth)
router.post('/deletePackerById/:id',packercontroller.deletePackerById)//done
router.post('/forgotPwdPacker',packercontroller.forgotPassword)//done
//luggage related
router.post('/addLuggage',packercontroller.addLuggage)//done
router.post('/viewBooking/:id',packercontroller.viewOrderById)
router.post('/deleteOrderById/:id',packercontroller.deleteOrderById)//done
router.post('/viewOrderByPackerId/:id',packercontroller.viewOrderByPackerId)//done
router.post('/viewOrderByMoverId/:id',moverController.viewAcceptedOrderByMoverId)// view accepted orders for movers
router.post('/approveOrder/:id',moverController.approveOrder)
router.post('/rejectOrder/:id',moverController.rejectOrder)

router.post('/trackMyLuggage/:id',packercontroller.trackMyLuggage)


//Movers
router.post('/registerMover',moverController.registerMover)//done
router.post('/loginMover',moverController.login)//done
router.post('/checkAuthmover',moverController.requireAuth)
router.post('/viewAllMovers',moverController.viewMovers)//done
router.post('/viewMovrById/:id',moverController.showMoverById)//done
router.post('/editMoverById/:id',moverController.editMoversById)//done
router.post('/deleteMoverById/:id',moverController.deleteMoverById)//done
router.post('/viewMoverRequests',moverController.viewMoverRequests)//done

router.post('/approveMover/:id',moverController.ApproveMover)//done

router.post('/forgotPwdMover',moverController.forgotPassword)//done
router.post('/addReview',moverController.addReview)//done
router.post('/addRating',moverController.addRating)//done
router.post('/updatePayment/:id',moverController.generatePayment)//date
router.post('/viewMoverRequests',moverController.viewMoverRequests)//


//Mover rates
router.post('/addRate/:mover_id',moverrate.addRate)//done
router.post('/viewRateByMover/:mover_id',moverrate.viewRatesByMover)//done
router.post('/editRateById/:id',moverrate.editRateById)//done

//mover bookings
router.post('/showBookingReqs/:id',moverController.showBookingReqs) //view order reqs for movers
router.post('/approveOrder/:id',moverController.approveOrder)//approve order for movers
router.post('/rejectOrder/:id',moverController.rejectOrder)//reject  order for movers


router.post('/registerComplaint',complaint.registerComplaint)//done
router.post('/viewComplaintByMId/:id',complaint.viewComplaintByMId)//done
router.post('/viewAllComplaint',complaint.viewAllComplaint)//done


//Driver routes 
router.post('/registerDriver',driverController.registerDriver)
router.post('/registerDriver',driverController.loginDriver)
router.post('/viewDriverById/:id',driverController.viewDriverById)
router.post('/editDriverById/:id',driverController.editDriverById)
router.post('/deleteDriverById/:id',driverController.deleteDriverById)
router.post('/acceptorderbyDriverId/:id',driverController.acceptorderbyDriverId)// driver accepting order 
router.post('/viewDrivers',driverController.viewDrivers) // for Admin
router.post('/viewPendingOrdesForDrivers/:id',driverController.viewPendingOrdesForDrivers) // view pending orders for driver
router.post('/viewDriverByMId/:id',driverController.viewDriverByMId) // view all drivers by mover id

module.exports=router