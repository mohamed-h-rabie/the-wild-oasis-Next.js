"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
export async function signinAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}
export async function signoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("please Login first");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const updatedFields = { nationalID, nationality, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}
export async function deleteReservarion(bookingId) {
  // await new Promise((res) => setTimeout(res, 1000));
  const session = await auth();
  if (!session) throw new Error("please Login first");
  const guestBookings = await getBookings(session?.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("you are not allowed to delete this booking");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}
export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("please Login first");
  const bookingId = +formData.get("id");

  const guestBookings = await getBookings(session?.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("you are not allowed to delete this booking");

  const updatedData = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 100),
  };
  const { error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations`);
  redirect("/account/reservations");
}
export async function createReservation(bookingDataa, formData) {
  const session = await auth();
  if (!session) throw new Error("please Login first");

  const bookingData = {
    ...bookingDataa,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
    guestId: session?.user?.guestId,
    extrasPrice: 0,
    totalPrice: bookingDataa?.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  const { error } = await supabase

    .from("bookings")
    .insert(bookingData)
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/account/reservations/cabins/${bookingDataa?.cabinId}`);
  revalidatePath(`/account/reservations`);
  redirect("/cabins/thankyou");
}
