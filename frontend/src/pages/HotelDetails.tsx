// 📁 src/pages/HotelDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getHotelById, getRoomsByHotelId } from "../services/api"; // ✅ Gọi qua service API
import type{ Room } from '../types/room';
import type{ Hotel } from '../types/hotel';


export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      if (!id) return;
      try {
        const hotelData = await getHotelById(Number(id)); // ✅ lấy hotel
        setHotel(hotelData);

        const roomData = await getRoomsByHotelId(Number(id)); // ✅ lấy rooms
        setRooms(roomData);
      } catch (err) {
        console.error("❌ Failed to fetch hotel or rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelAndRooms();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-10 text-blue-500">
        Loading hotel details...
      </div>
    );

  if (!hotel)
    return (
      <div className="text-center py-10 text-red-500">Hotel not found.</div>
    );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">{hotel.name}</h2>

      <img
        src={hotel.imageUrl || "/placeholder.jpg"}
        alt={hotel.name}
        className="w-full h-64 object-cover rounded mb-4"
        onError={(e) =>
          ((e.target as HTMLImageElement).src = "/placeholder.jpg")
        }
      />

      <div className="mb-4">
        <p>
          <strong>Address:</strong> {hotel.address}, {hotel.city}
        </p>
        <p>
          <strong>Phone:</strong> {hotel.phone}
        </p>
        <p>
          <strong>Email:</strong> {hotel.email}
        </p>
        <p>
          <strong>Description:</strong> {hotel.description}
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4">Available Rooms</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map((room) => (
          <div
            key={room.roomNumber}
            className="bg-white shadow p-4 rounded border"
          >
            <h4 className="text-lg font-bold">{room.type}</h4>
            <p>{room.description}</p>
            <p className="text-sm text-gray-600">Status: {room.status}</p>
            <p className="font-semibold text-blue-700 mt-2">
              {room.price.toLocaleString()} VND / night
            </p>
            <Link
              to={`/rooms/${room.roomNumber}`}
              className="inline-block mt-3 text-sm text-blue-600 hover:underline"
            >
              View Room Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
