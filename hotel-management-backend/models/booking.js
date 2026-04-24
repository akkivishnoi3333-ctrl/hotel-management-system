const mongoose = require("mongoose");
 const {ZERO, ONE, TWO} = require("../constants/constants")
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  status: {
  type: Number,
  enum: [ZERO,ONE, TWO], //0=> upcoming, 1=>compeleted, 1=>deleted
  default: ZERO
  
  }
}, {timestamps: true});

module.exports = mongoose.model("Booking", bookingSchema);