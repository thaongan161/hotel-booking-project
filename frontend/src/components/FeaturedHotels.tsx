import { useEffect, useState } from 'react';
import { getAllHotels } from "../services/api";
import type { Hotel } from "../types/hotel";
import { Link } from 'react-router-dom';

export default function FeaturedHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getAllHotels()
      .then((res) => setHotels(res.data))
      .catch((err) => console.error("❌ Failed to fetch hotels:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 500; // chiều cao Hero
      const scrollY = window.scrollY;
      setOffset(Math.max(0, scrollY - heroHeight + 100)); // offset để trồi lên
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-blue-500 font-medium">Loading hotels...</div>;
  }

  return (
    <div
      className="py-10 px-6 max-w-[1440px] mx-auto relative z-30"
      style={{
        transform: `translateY(-${offset}px)`, // trồi lên khi scroll
        transition: 'transform 0.3s ease-out',
      }}
    >
      <h2 className="text-2xl font-bold mb-6">Featured Hotels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.length === 0 ? (
          <p className="text-gray-500">No hotels available.</p>
        ) : (
          hotels.map((hotel) => (
            <Link
              to={`/hotels/${hotel.hotelId}`}
              key={hotel.hotelId}
              className="bg-white shadow-md rounded overflow-hidden transition hover:shadow-lg"
            >
              <img
                src={hotel.imageUrl || '/placeholder.jpg'}
                alt={hotel.name}
                className="w-full h-48 object-cover"
                onError={(e) => ((e.target as HTMLImageElement).src = '/placeholder.jpg')}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-700">{hotel.name}</h3>
                <p className="text-sm text-gray-600">{hotel.address}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
