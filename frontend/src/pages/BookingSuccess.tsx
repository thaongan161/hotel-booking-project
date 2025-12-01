import { useLocation, useNavigate } from "react-router-dom";

interface BookingResponse {
  bookingId: number;
  userId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  createAt: string;
}

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state as BookingResponse | null;

  if (!bookingData) {
    return (
      <div className="text-center py-10 text-red-500">
        Không có thông tin đặt phòng.  
        <button
          onClick={() => navigate("/")}
          className="ml-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-10 px-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        ✅ Đặt phòng thành công!
      </h2>
      <p><strong>Mã đặt phòng:</strong> {bookingData.bookingId}</p>
      <p><strong>Ngày nhận phòng:</strong> {bookingData.checkInDate}</p>
      <p><strong>Ngày trả phòng:</strong> {bookingData.checkOutDate}</p>
      <p><strong>Trạng thái:</strong> {bookingData.status}</p>
      <p><strong>Ngày tạo:</strong> {new Date(bookingData.createAt).toLocaleString()}</p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate("/")}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          🏠 Về trang chủ
        </button>
        <button
          onClick={() => navigate("/my-bookings")}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          📜 Xem lịch sử đặt
        </button>
      </div>
    </div>
  );
}
