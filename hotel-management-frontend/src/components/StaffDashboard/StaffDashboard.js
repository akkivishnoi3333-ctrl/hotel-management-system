 import React, { useEffect, useState } from "react";
 import API from "../../utils/api"; 
import "./StaffDashboard.css";
import constants from "../../constants/constants"
export default function StaffDashboard() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/getAllBookings");
      console.log("Bookings data:", data);
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };
  fetchBookings();
}, []);

    const checkoutBooking = async (id) => {
      await API.put(`/checkout/${id}`);
      setBookings(bookings.map(b => b._id === id ? { ...b, status: constants.COMPLETED } : b));
    };

    const cancelBooking = async (id) => {
      await API.put(`/cancleBooking/${id}`);
      setBookings(bookings.map(b => b._id === id ? { ...b, status: constants.CANCELLED } : b));
    };
  return (
    
     <div className="staff-dashboard">
       <h2>Staff Dashboard – Manage Bookings</h2>
       <table className="booking-table">
         <thead>
           <tr>
             <th>Guest</th>
             <th>Hotel</th>
             <th>Check-In</th>
             <th>Check-Out</th>
             <th>Status</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           {bookings.map(b => (
             <tr key={b._id}>
               <td>{b.userId.name}</td>
               <td>{b.hotelId.name}</td>
               <td>{new Date(b.checkIn).toLocaleDateString()}</td>
               <td>{new Date(b.checkOut).toLocaleDateString()}</td>
               <td>{b.status === constants.UPCOMING && <span>UPCOMING</span>}
        
                 {b.status === constants.COMPLETED && <span>COMPELETED</span>}
                 {b.status === constants.CANCELLED && <span>CANCELLED</span>}</td>
               <td>
                 {b.status === constants.UPCOMING && (
                   <>
                     <button onClick={() => checkoutBooking(b._id)}>Checkout</button>
                    <button  onClick={() => cancelBooking(b._id)}>Cancel</button> 
                   </>
                 )}
                 {b.status === constants.COMPLETED && <span>✔ Checked Out</span>}
                 {b.status === constants.CANCELLED && <span>✖ Cancelled</span>}
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
  );
}
