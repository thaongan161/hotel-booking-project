// 📁 src/components/HotelCard.tsx
// import React from 'react';

interface HotelCardProps {
  image: string;
  name: string;
  location?: string;
  price?: number; // optional
}

export default function HotelCard({ image, name, location, price }: HotelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={image}
        alt={name}
        className="h-48 w-full object-cover"
        onError={(e) => ((e.target as HTMLImageElement).src = '/placeholder.jpg')}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-blue-700">{name}</h3>
        {location && <p className="text-sm text-gray-500">{location}</p>}
        {price !== undefined && <p className="mt-2 text-blue-600 font-bold">{price.toLocaleString()} VND/night</p>}
      </div>
    </div>
  );
}
