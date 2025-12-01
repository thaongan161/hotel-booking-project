// 📁 src/types/booking.ts
export interface Booking {
  bookingId: number;
  userId: number;
  roomId: number;
  checkInDate: string; // ISO date string
  checkOutDate: string;
  status: string; // pending, confirmed, cancelled
}
