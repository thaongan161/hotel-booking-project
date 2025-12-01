import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import type { ApiResponse } from "../types/api";
import type { Room } from "../types/room";

interface BookingRequest {
  userId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
}

interface BookingResponse {
  bookingId: number;
  userId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  createAt: string;
}

export default function Booking() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(true);

  // ---- Lấy thông tin phòng ----
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse<Room>>(`/rooms/${roomId}`);
        setRoom(res.data.data);
      } catch (err) {
        console.error("❌ Failed to fetch room:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  // ---- Xử lý đặt phòng ----
  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("Bạn cần đăng nhập để đặt phòng!");
      navigate("/login");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      alert("Vui lòng chọn ngày nhận và trả phòng!");
      return;
    }

    try {
      const payload: BookingRequest = {
        userId: parseInt(userId),
        roomId: parseInt(roomId || "0"),
        checkInDate,
        checkOutDate
      };

      const res = await axiosInstance.post<ApiResponse<BookingResponse>>(
        "/bookings",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // ✅ Điều hướng sang trang BookingSuccess và truyền dữ liệu
      navigate("/booking-success", { state: res.data.data });
    } catch (err) {
      console.error("❌ Booking failed:", err);
      alert("Đặt phòng thất bại!");
    }
  };

  if (loading) return <div className="text-center py-10 text-blue-500">Loading...</div>;
  if (!room) return <div className="text-center py-10 text-red-500">Room not found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Đặt phòng - {room.hotelName}</h2>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        {room.imageUrls && room.imageUrls.length > 0 ? (
          <img src={room.imageUrls[0]} alt={room.type} className="w-full h-64 object-cover" />
        ) : (
          <img src="/placeholder.jpg" alt="No image" className="w-full h-64 object-cover" />
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold">{room.type}</h3>
          <p className="text-gray-600">Giá: {room.price.toLocaleString()} VND / đêm</p>
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded-lg space-y-4">
        <div>
          <label className="block font-medium mb-1">Ngày nhận phòng</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Ngày trả phòng</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Xác nhận đặt phòng
        </button>
      </div>
    </div>
  );
}
