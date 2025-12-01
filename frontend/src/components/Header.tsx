// import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHotel, FaPlane, FaCar, FaMapMarkedAlt, FaTaxi
} from 'react-icons/fa';
import { MdHelpOutline } from 'react-icons/md';

export default function Header() {
  const navigate = useNavigate();

  // Lấy thông tin user từ localStorage
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload(); // Reload để cập nhật UI
  };

  return (
    <header className="bg-[#3604d3] text-white py-3 px-8 shadow-md">
      <div className="max-w-[1440px] mx-auto">
        {/* Row 1 */}
        <div className="flex justify-between items-center mb-3">
          <div className="text-[20px] font-bold">EasyBooking</div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="font-bold">VND</span>
            <MdHelpOutline size={20} />

            {user ? (
              <>
                <span className="font-semibold">👋 {user}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-[#3604d3] px-4 py-[6px] rounded-md font-medium hover:bg-blue-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-white text-[#3604d3] px-4 py-[6px] rounded-md font-medium hover:bg-blue-100 transition"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-white text-[#3604d3] px-4 py-[6px] rounded-md font-medium hover:bg-blue-100 transition"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 text-sm px-4 py-2 border border-white rounded-full hover:bg-white hover:text-[#3604d3] transition">
            <FaHotel /> Stays
          </button>
          <button className="flex items-center gap-2 text-sm px-4 py-2 border border-white rounded-full hover:bg-white hover:text-[#3604d3] transition">
            <FaPlane /> Flights
          </button>
          <button className="flex items-center gap-2 text-sm px-4 py-2 border border-white rounded-full hover:bg-white hover:text-[#3604d3] transition">
            <FaPlane /> Flights & Hotel
          </button>
          <button className="flex items-center gap-2 text-sm px-4 py-2 border border-white rounded-full hover:bg-white hover:text-[#3604d3] transition">
            <FaCar /> Car rental
          </button>
          <button className="flex items-center gap-2 text-sm px-4 py-2 border border-white rounded-full hover:bg-white hover:text-[#3604d3] transition">
            <FaMapMarkedAlt /> Attractions
          </button>
          <button className="flex items-center gap-2 text-sm px-4 py-2 border border-white rounded-full hover:bg-white hover:text-[#3604d3] transition">
            <FaTaxi /> Airport taxi
          </button>
        </div>
      </div>
    </header>
  );
}
