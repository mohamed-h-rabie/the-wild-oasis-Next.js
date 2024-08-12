"use server";
import { signIn, signOut } from "./auth";

export async function signinAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}
export async function signoutAction() {
  await signOut({ redirectTo: "/" });
}
