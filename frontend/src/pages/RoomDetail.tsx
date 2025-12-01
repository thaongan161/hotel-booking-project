// 📁 src/pages/RoomDetail.tsx
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import type { Room } from '../types/room';
import { useState, useEffect } from 'react';

// =============================
// 🌟 Carousel Component – Manual Control
// =============================
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  const goPrev = () => setCurrentIndex(prevIndex);
  const goNext = () => setCurrentIndex(nextIndex);

  return (
    <div className="relative w-full h-72 md:h-96 flex items-center justify-center overflow-visible">
      {images.map((img, i) => {
        let styleClasses =
          'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out rounded-lg shadow-lg';

        if (i === currentIndex) {
          styleClasses += ' z-20 w-64 md:w-150 h-64 md:h-100 scale-105 opacity-100';
        } else if (i === prevIndex) {
          styleClasses +=
            ' z-10 w-48 md:w-56 h-48 md:h-56 scale-90 opacity-40 -translate-x-48 md:-translate-x-64';
        } else if (i === nextIndex) {
          styleClasses +=
            ' z-10 w-48 md:w-56 h-48 md:h-56 scale-90 opacity-40 translate-x-48 md:translate-x-64';
        } else {
          styleClasses += ' opacity-0';
        }

        return (
          <img
            key={i}
            src={img}
            alt={`Room Image ${i + 1}`}
            className={styleClasses + ' object-cover'}
            onError={(e) => ((e.target as HTMLImageElement).src = '/placeholder.jpg')}
          />
        );
      })}

      {/* Nút điều hướng */}
      <button
        onClick={goPrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 bg-black bg-opacity-30 text-white text-2xl px-3 py-1 rounded-full hover:bg-opacity-50 transition"
      >
        ❮
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 bg-black bg-opacity-30 text-white text-2xl px-3 py-1 rounded-full hover:bg-opacity-50 transition"
      >
        ❯
      </button>
    </div>
  );
};

// =============================
// RoomDetail Page
// =============================
export default function RoomDetail() {
  const { roomNumber } = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get<{ message: string; data: Room }>(
          `/rooms/${roomNumber}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        setRoom(res.data.data);
      } catch (err) {
        console.error('❌ Failed to fetch room:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomNumber]);

  if (loading)
    return (
      <div className="text-center py-10 text-blue-500">
        Loading room details...
      </div>
    );

  if (!room)
    return (
      <div className="text-center py-10 text-red-500">
        Room not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Room #{room.roomNumber} - {room.type}
      </h2>

      {/* ======================== */}
      {/*    📸 Carousel hình ảnh    */}
      {/* ======================== */}
      <div className="mb-6">
        {room.imageUrls?.length ? (
          <ImageCarousel images={room.imageUrls} />
        ) : (
          <img
            src="/placeholder.jpg"
            alt="No image available"
            className="w-full h-64 object-cover rounded shadow"
          />
        )}
      </div>

      {/* Thông tin phòng */}
      <div className="mb-4 space-y-1">
        <p><strong>Hotel:</strong> {room.hotelName}</p>
        <p><strong>Phone:</strong> {room.phone}</p>
        <p><strong>Status:</strong> {room.status}</p>
        <p><strong>Price:</strong> {room.price.toLocaleString()} VND / night</p>
        <p><strong>Description:</strong> {room.description}</p>
      </div>

      <Link to={`/booking/${room.roomNumber}`}>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Book Now
        </button>
      </Link>
    </div>
  );
}
