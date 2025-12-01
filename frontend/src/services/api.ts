// 📁 src/services/api.ts
import axiosInstance from "../api/axiosInstance";
import type { ApiResponse } from "../types/api";
import type { Hotel } from "../types/hotel";
import type { Room } from "../types/room";
import type { Booking } from "../types/booking";

// ===== HOTEL API =====
export const getAllHotels = async () => {
  const res = await axiosInstance.get<ApiResponse<Hotel[]>>("/hotels");
  return res.data;
};

export const getHotelById = async (id: number) => {
  const res = await axiosInstance.get<ApiResponse<any>>(`/hotels/${id}`);
  return res.data.data;
};

// ===== ROOM API =====
export const getRoomsByHotel = async (hotelId: number) => {
  const res = await axiosInstance.get<ApiResponse<Room[]>>(`/rooms/hotel/${hotelId}`);
  return res.data;
};

export const getRoomById = async (roomId: number) => {
  const res = await axiosInstance.get<ApiResponse<Room>>(`/rooms/${roomId}`);
  return res.data;
};

export const getRoomsByHotelId = async (hotelId: number) => {
  const res = await axiosInstance.get<ApiResponse<any[]>>(
    `/rooms/hotel/${hotelId}`
  );
  return res.data.data;
};

interface SearchParams {
  city?: string;
  type?: string;
  from?: string;
  to?: string;
}

export const searchRooms = async (searchParams: SearchParams): Promise<Room[]> => {
  const params = new URLSearchParams();

  if (searchParams.city) params.append("city", searchParams.city);
  if (searchParams.type) params.append("type", searchParams.type);
  if (searchParams.from) params.append("from", searchParams.from);
  if (searchParams.to) params.append("to", searchParams.to);

  const response = await axiosInstance.get<Room[]>(`/rooms/search?${params.toString()}`);
  return response.data;
};


// ===== BOOKING API =====
export const createBooking = async (payload: any) => {
  const res = await axiosInstance.post<ApiResponse<Booking>>('/bookings', payload);
  return res.data;
};
