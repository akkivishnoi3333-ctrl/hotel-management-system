import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Hotels from "./components/Hotels/Hotels";
import BookingForm from "./components/BookingForm/BookingForm";
import MyBookings from "./components/MyBookings/MyBookings";
import Register from "./components/Register/Register";
import StaffDashboard from "./components/StaffDashboard/StaffDashboard";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/book/:hotelId" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        < Route path="/staff-dashboard" element={<StaffDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;