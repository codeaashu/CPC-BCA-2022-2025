"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase/client";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Required fields validation
    if (!firstName.trim() || !email.trim() || !password.trim()) {
      setError("First name, email, and password are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        setSuccess(
          "Account created! Please verify your email before logging in."
        );
        setError(null);
      }
      // Optionally: Save firstName/lastName to Firestore here
      // Do NOT redirect to login until email is verified
    } catch (err: any) {
      // If user already exists, redirect to login page
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
        return;
      }
      setError(err?.message || "An error occurred during signup.");
      setSuccess(null);
    }
  };

  const handleProviderSignup = async (providerType: "google" | "github") => {
    setError(null);
    setSuccess(null);
    try {
      const provider =
        providerType === "google"
          ? new GoogleAuthProvider()
          : new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      let finalProfilePicture = user.photoURL || "";

      if (userSnap.exists()) {
        const existingData = userSnap.data();

        if (
          existingData.profilePicture &&
          existingData.profilePicture !== user.photoURL
        ) {
          finalProfilePicture = existingData.profilePicture;
        }
      }
      // Save user info to Firestore if not exists
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          provider: providerType,
          profilePicture: finalProfilePicture,
        },
        { merge: true }
      );
      setSuccess("Account created! You are now signed up.");
      router.push("/");
    } catch (err: any) {
      setError(err?.message || "Failed to sign up with provider.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient">
      <div className="container max-w-md mx-4 bg-white rounded-lg">
        <Card className="w-full">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center mb-2">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-center mb-2">
                  {success}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Create Account
              </Button>
            </form>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-2 text-gray-400 text-xs">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full mb-2 flex items-center justify-center gap-2"
              onClick={() => handleProviderSignup("google")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 533.5 544.3"
              >
                <path
                  fill="#4285F4"
                  d="M533.5 278.4c0-17.4-1.6-34.2-4.6-50.4H272.1v95.3h146.9c-6.3 34-25 62.7-53.4 82l86.1 66.9c50.3-46.4 81.8-114.8 81.8-193.8z"
                />
                <path
                  fill="#34A853"
                  d="M272.1 544.3c72.9 0 134-24.2 178.6-65.8l-86.1-66.9c-24 16.1-54.8 25.6-92.5 25.6-71 0-131.2-47.9-152.7-112.3H30.1v70.8c44.6 88.1 136.3 148.6 242 148.6z"
                />
                <path
                  fill="#FBBC05"
                  d="M119.4 324.9c-10.2-30.2-10.2-62.6 0-92.8V161.3H30.1c-39.6 79.1-39.6 172.5 0 251.6l89.3-67.9z"
                />
                <path
                  fill="#EA4335"
                  d="M272.1 107.4c39.6-.6 77.6 13.7 106.8 39.6l80-80.1C413.6 23.3 344.7-1.5 272.1 0 166.4 0 74.7 60.5 30.1 148.6l89.3 67.9c21.5-64.4 81.7-112.3 152.7-112.3z"
                />
              </svg>
              Continue with Google
            </Button>
            {/* <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleProviderSignup("github")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.186 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
                />
              </svg>
              Continue with GitHub
            </Button> */}
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-center">
              <span className="text-gray-500">Already have an account?</span>{" "}
              <Link href="/login" className="text-emerald-600 hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
