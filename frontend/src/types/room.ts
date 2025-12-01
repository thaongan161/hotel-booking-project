// 📁 src/types/room.ts
export interface Room {
  roomNumber: number;
  hotelName: string;
  phone: string;
  type: string;
  price: number;
  status: string;
  description: string;
  imageUrls?: string[];
}