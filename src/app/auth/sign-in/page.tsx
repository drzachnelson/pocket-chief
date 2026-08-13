import type { Metadata } from "next";
import { SignInForm } from "@/components/sign-in-form";
import { isDemoMode } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };
export default function SignInPage() { return <SignInForm demo={isDemoMode()} />; }
