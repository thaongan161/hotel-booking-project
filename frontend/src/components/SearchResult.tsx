import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchRooms } from "../services/api";
import type { Room } from "../types/room";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy params từ URL
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city") || "";
  const type = queryParams.get("type") || "";
  const from = queryParams.get("from") || "";
  const to = queryParams.get("to") || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await searchRooms({ city, type, from, to });
        setRooms(res || []);
      } catch (err) {
        console.error("❌ Failed to fetch search results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, type, from, to]);

  if (loading) {
    return <div className="text-center py-10 text-blue-500">Loading results...</div>;
  }

  if (rooms.length === 0) {
    return <div className="text-center py-10 text-gray-500">No rooms found.</div>;
  }

  return (
    <div className="max-w-7xl max-h-5xl mx-auto py-10 px-4 space-y-4 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Search Results</h2>

        {rooms.map((room) => (
            <div
            key={room.roomNumber}
            onClick={() => navigate(`/rooms/${room.roomNumber}`)}
            className="flex gap-6 items-center border rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition cursor-pointer w-full"
            style={{ minHeight: "300px" }} 
            >
            {/* Image */}
            <img
                src={room.imageUrls && room.imageUrls.length > 0 ? room.imageUrls[0] : "/placeholder.jpg"}
                alt={`${room.type} - ${room.hotelName}`}
                className="w-95 h-75 object-cover flex-shrink-0"
                onError={(e) => ((e.target as HTMLImageElement).src = "/placeholder.jpg")}
            />

            {/* Info */}
            <div className="flex-1 p-4">
                <h3 className="text-xl font-semibold">{room.type} - {room.hotelName}</h3>
                <p className="text-gray-600">{room.description}</p>
                <p className="text-sm text-gray-500">Status: {room.status}</p>
                <p className="text-blue-600 font-bold mt-2 text-lg">
                {room.price.toLocaleString()} VND / night
                </p>
            </div>
            </div>
        ))}
    </div>

  );
}
