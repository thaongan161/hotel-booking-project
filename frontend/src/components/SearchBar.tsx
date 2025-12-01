// src/components/SearchBar.tsx
import { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// import type { Room } from "../types/room";

export default function SearchBar() {
  const [city, setCity] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!from || !to || !city) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }

    const params = new URLSearchParams();

    if (city) params.append('city', city);
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    if (type) params.append('type', type);

    navigate(`/search-results?${params.toString()}`);
  };

  return (
    <div className="bg-white border-4 border-orange-400 rounded-xl p-4 shadow-xl w-full max-w-6xl mx-auto -mt-8 flex flex-col md:flex-row gap-3">
      {/* Destination */}
      <div className="flex items-center flex-1 border border-gray-300 rounded px-3 py-2">
        <input
          type="text"
          placeholder="Can Tho"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full text-sm focus:outline-none"
        />
      </div>

      {/* Dates */}
      <div className="flex items-center flex-1 border border-gray-300 rounded px-3 py-2 gap-2">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-1/2 text-sm focus:outline-none"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-1/2 text-sm focus:outline-none"
        />
      </div>

      {/* Room type */}
      <div className="flex items-center flex-1 border border-gray-300 rounded px-3 py-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full text-sm focus:outline-none"
        >
          <option value="">All types</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      {/* Search button */}
      <button
        className="px-5 py-2 bg-[#3500d3] text-white rounded font-medium whitespace-nowrap"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
