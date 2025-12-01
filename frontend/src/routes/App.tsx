import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import Register from '../pages/Register';
import Login from '../pages/Login';
import HotelDetail from '../pages/HotelDetails';
import RoomDetail from '../pages/RoomDetail';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResult';
import Booking from "../pages/Booking";
import BookingSuccess from '../pages/BookingSuccess';
import MyBookings from '../pages/MyBookings';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/rooms/:roomNumber" element={<RoomDetail />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/booking/:roomId" element={<Booking />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
