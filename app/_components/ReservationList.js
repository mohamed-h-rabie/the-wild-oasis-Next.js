"use client";
import { deleteReservarion } from "../_lib/action";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBooking, bookingId) => {
      return curBooking.filter((booking) => booking.id !== bookingId);
    }
  );
  async function onDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservarion(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={onDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
