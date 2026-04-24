import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../utils/api"; 
import "./MyBookings.css";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaRupeeSign } from "react-icons/fa";
import STATUS from "../../constants/constants"; // named import

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
 /// const [activeTab, setActiveTab] = useState("ALL");
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "ALL");
const navigate = useNavigate();
  // Fetch bookings whenever activeTab changes
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let res;
        if (activeTab === "ALL") {
          res = await API.get("/getUserBooking");
        } else {
          res = await API.get(`/getUserBooking?status=${STATUS[activeTab]}`);
        }
        setBookings(res.data.booking || []); // backend sends { booking: [...] }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      }
    };
    fetchBookings();
  }, [activeTab]);

  const cancelBooking = async (id) => {
    try {
      await API.put(`/api/cancleBooking/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };
  const bookAgain = async()=>{
    navigate("/Hotels")
  }

  return (
    <div className="my-bookings-page">
      <div className="tabs">
        {["UPCOMING", "COMPLETED", "CANCELLED", "ALL"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <div className="booking-date">
              <FaCalendarAlt />{" "}
              {new Date(booking.checkIn).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <h3>{booking.hotelId?.name}</h3>
            <p className="hotel-location">
              <FaMapMarkerAlt /> {booking.hotelId?.location}
            </p>
            <p>
              <FaCalendarAlt /> {booking.checkIn} → {booking.checkOut}
            </p>
            <p>
              <FaUser /> Guests: {booking.guests}
            </p>
            <p className="price">
              <FaRupeeSign /> {booking.hotelId?.pricePerNight}
            </p>
            <div className="actions">
              {booking.status == STATUS.UPCOMING && (
                <><button className="secondary-btn" onClick={()=>bookAgain()}>Book Again</button>
              <button
                className="secondary-btn"
                onClick={() => cancelBooking(booking._id)}
              >
                Cancel Booking
              </button></>
              )}
                {booking.status == STATUS.COMPLETED && (
                <>
                <button className="secondary-btn"  style={{ backgroundColor: "#fff", color: "green" }}>Completed</button>
                <button className="secondary-btn" onClick={()=>bookAgain()}>Book Again</button>
              </>
              )}
               {booking.status == STATUS.CANCELLED && (
                <>
                <button className="secondary-btn"  style={{ backgroundColor: "#fff", color: "red" }}>Cancelled</button>
                <button className="secondary-btn" onClick={()=>bookAgain()}>Book Again</button>
              </>
              )}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
