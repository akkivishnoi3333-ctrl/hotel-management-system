import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "../../App.css"; // custom CSS file
export default function BookingForm() {
  const { hotelId } = useParams();   // get hotelId from URL
  const [hotel, setHotel] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
const navigate = useNavigate();

 
  useEffect(() => {
  const fetchHotel = async () => {
    try {
      const { data } = await API.get(`/getHotel/${hotelId}`);
      setHotel(data.hotel);   // single hotel object
    } catch (err) {
      console.error("Error fetching hotel:", err);
    }
  };
  fetchHotel();
}, [hotelId]);

  const handleBooking = async () => {
    try {
      await API.post("/createBooking", { hotelId, checkIn, checkOut, guests });
      alert("Booking confirmed!");
      navigate("/my-bookings",{ state: { activeTab: "UPCOMING" } });
    } catch (err) {
      alert("Error booking hotel: " + err.response?.data?.message);
    }
  };

  if (!hotel) return <p>Loading hotel details...</p>;

  return (
   <div className="booking-container">
      <div className="booking-card">
      <h2>Book {hotel.name}</h2>
      <p>{hotel.location} - ${hotel.pricePerNight}/night</p>

      <label>Check-In Date</label><br />
      <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} /><br />

      <label>Check-Out Date</label><br />
      <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /><br />

      <label>Guests</label><br />
      <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} /><br />

      <button onClick={handleBooking}>Confirm Booking</button>
        </div>
        </div>
  );
}