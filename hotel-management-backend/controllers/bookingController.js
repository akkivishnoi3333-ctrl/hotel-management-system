const bookingSchema = require("../models/booking")
const hotelSchema = require("../models/hotel")
const {ZERO, ONE, TWO} = require("../constants/constants")
const mongoose =require("mongoose")
const booking = {};
 booking.createBooking = async(req, res)=>{
    try{
        const data = req.body;
        const hotel = await hotelSchema.findById({_id: data.hotelId});
        if(hotel){
            if(hotel.roomsAvailable <=0){
                res.status(400).json({
            message: "room is not available"
        })
            }else{console.log("hgh")
                console.log(req.userId)
                data.userId = req.userId;
                const booking = await bookingSchema.create(data);
                hotel.roomsAvailable -=1 ;
                await hotel.save();
                 res.status(201).json({
            message: "booking successfully",
            result: booking
        })
            }
           

        }else{
             res.status(404).json({
            message: "hotel not found"
        })
        }
    }catch(err){
         res.status(400).json({
            message: err.message
        })
    }
}


// cancel a booking
booking.cancleBooking = async(req, res)=>{
    try{
        const booking = await bookingSchema.findById({_id:req.params.id})
        if(!booking){
          return  res.status(404).json({
            message: "booking not found"
        })
        }
        const hotel = await hotelSchema.findById({_id: booking.hotelId});
        if(!hotel){
            return res.status(404).json({
            message: "hotel not found"
        })
    }
        //cancle booking
          booking.status = TWO;
          await booking.save();
         console.log(booking)
         //increament in hotel rooms
            hotel.roomsAvailable +=1 ;
           await  hotel.save();
             res.status(200).json({
            message: "booking cancle successfully"
        })
           
        }catch(err){
         res.status(400).json({
            message: err.message
        })
    }
}
//checkout
// cancel a booking
booking.checkout = async(req, res)=>{
    try{
        const booking = await bookingSchema.findById({_id:req.params.id})
        if(!booking){
          return  res.status(404).json({
            message: "booking not found"
        })
        }
        const hotel = await hotelSchema.findById({_id: booking.hotelId});
        if(!hotel){
            return res.status(404).json({
            message: "hotel not found"
        })
    }
        //checkout booking
          booking.status = ONE;
          await booking.save();
         console.log(booking)
         //increament in hotel rooms
            hotel.roomsAvailable +=1 ;
           await  hotel.save();
             res.status(200).json({
            message: "Booking checked out successfully"
        })
           
        }catch(err){
         res.status(400).json({
            message: err.message
        })
    }
}

 booking.getUserBooking = async(req, res)=>{
    try{ 
       const ObjectId = new mongoose.Types.ObjectId(req.userId)
       if(!req.query.status){
         const booking = await bookingSchema.find({userId: ObjectId}) 
        .populate({path:"userId", select:"-_id"})
        .populate({path:"hotelId", select:"-_id"})
        if(!booking){
            return  res.status(404).json({
            message: "booking not found"

        })
        }
        console.log(booking)
         return res.status(200).json({
            message: "booking found successfully",
            booking
        })
       }
        const booking = await bookingSchema.find({userId: ObjectId, status: req.query.status}) 
        .populate({path:"userId", select:"-_id"})
        .populate({path:"hotelId", select:"-_id"})
        if(!booking){
             return res.status(404).json({
            message: "booking not found"

        })
        }
        console.log(booking)
         return res.status(200).json({
            message: "booking found successfully",
            booking
        })
    }catch(err){
        console.log(err)
         return res.status(400).json({
            message: err.message
        })
    }
}

booking.getAllBookings = async(req, res)=>{
    try{ console.log("hit")
        const bookings = await bookingSchema.find() 
        .populate({path:"userId", select:"-_id"})
        .populate({path:"hotelId", select:"-_id"})
        if(!bookings){
             return res.status(404).json({
            message: "bookings not found"

        })
        }
          res.status(200).json({
            message: "bookings found successfully",
            bookings
        })
    }catch(err){
        console.log(err)
          res.status(400).json({
            message: err.message
        })
    }
}
module.exports = booking;