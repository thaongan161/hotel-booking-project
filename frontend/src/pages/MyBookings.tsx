// 📁 src/pages/MyBookings.tsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import type { ApiResponse } from "../types/api";

interface Booking {
  bookingId: number;
  roomId: number;
  roomNumber: string;
  hotelName: string;
  type: string;
  price: number;
  status: string;
  checkInDate: string;
  checkOutDate: string;
  createAt: string;
  imageUrls?: string[];
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Bạn cần đăng nhập để xem lịch sử đặt phòng!");
        navigate("/login");
        return;
      }

      try {
        const res = await axiosInstance.get<ApiResponse<Booking[]>>(
          `/bookings/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setBookings(res.data.data);
      } catch (err) {
        console.error("❌ Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) {
    return <div className="text-center py-10 text-blue-500">Đang tải dữ liệu...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Bạn chưa có đơn đặt phòng nào.
        <br />
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          🏠 Về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">📜 Lịch sử đặt phòng</h2>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.bookingId}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row"
          >
            <div className="w-full md:w-1/3">
              {booking.imageUrls && booking.imageUrls.length > 0 ? (
                <img
                  src={booking.imageUrls[0]}
                  alt={booking.type}
                  className="w-full h-56 object-cover"
                  onError={(e) => ((e.target as HTMLImageElement).src = "/placeholder.jpg")}
                />
              ) : (
                <img
                  src="/placeholder.jpg"
                  alt="No image"
                  className="w-full h-56 object-cover"
                />
              )}
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-blue-700">{booking.hotelName}</h3>
              <p className="text-gray-600">Phòng: {booking.type} - #{booking.roomNumber}</p>
              <p className="text-gray-500">Giá: {booking.price.toLocaleString()} VND / đêm</p>
              <p className="text-gray-500">Trạng thái: {booking.status}</p>
              <p className="text-gray-500">
                Nhận phòng: {booking.checkInDate} | Trả phòng: {booking.checkOutDate}
              </p>
              <p className="text-gray-400 text-sm">
                Ngày đặt: {new Date(booking.createAt).toLocaleString()}
              </p>

              <div className="mt-auto flex gap-3 pt-4">
                <Link
                  to={`/rooms/${booking.roomId}`}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Xem chi tiết phòng
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
