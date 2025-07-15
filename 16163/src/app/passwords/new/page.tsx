"use client";

import { useRouter } from "next/navigation";
import PasswordForm from "@/components/PasswordForm";
import toast from "react-hot-toast";

export default function NewPasswordPage() {
  const router = useRouter();

  const handleSubmit = async (data: {
    title: string;
    username: string;
    password: string;
    website?: string;
    notes?: string;
  }) => {
    try {
      const response = await fetch("/api/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create password entry");
      }

      toast.success("Password saved successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to save password");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Add New Password
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <PasswordForm
            onSubmit={handleSubmit}
            onCancel={() => router.push("/")}
          />
        </div>
      </div>
    </div>
  );
}
