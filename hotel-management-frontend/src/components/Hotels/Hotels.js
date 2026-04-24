import React, { useEffect, useState } from "react";  // <-- import hooks
import { useNavigate } from "react-router-dom";      // <-- import navigation
import API from "../../utils/api"; 
import "../../App.css"; 
export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      const { data } = await API.get("/getHotels");
      setHotels(data.hotels); //here hotels (data.hotels) come from => {hotel: [...]} from backene
    };
    fetchHotels();
  }, []);

  return (
     <div className="hotels-page">
      <h2 className="page-title">Available Hotels</h2>
      <div className="hotels-grid">
        {Array.isArray(hotels) && hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <img
              src={
                hotel.hotelImage
                  ? `http://localhost:5000/${hotel.hotelImage}`
                  : "/placeholder.jpg"
              }
              alt={hotel.name}
              className="hotel-image"
            />
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p className="hotel-location">{hotel.location}</p>
              <p className="hotel-price">₹{hotel.pricePerNight}/night</p>
              <p className="hotel-rooms">Rooms Available: {hotel.roomsAvailable}</p>
              <button
                className="book-btn"
                onClick={() => navigate(`/book/${hotel._id}`)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}