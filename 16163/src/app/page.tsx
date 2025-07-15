"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import PasswordCard from "@/components/PasswordCard";
import toast from "react-hot-toast";

interface PasswordEntry {
  id: string;
  title: string;
  username: string;
  password: string;
  website?: string;
  notes?: string;
}

export default function Home() {
  const router = useRouter();
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await fetch("/api/passwords");
      if (!response.ok) {
        throw new Error("Failed to fetch passwords");
      }
      const data = await response.json();
      setPasswords(data);
    } catch (error) {
      toast.error("Failed to load passwords");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this password?")) {
      return;
    }

    try {
      const response = await fetch(`/api/passwords/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete password");
      }

      setPasswords((prev) => prev.filter((p) => p.id !== id));
      toast.success("Password deleted successfully");
    } catch (error) {
      toast.error("Failed to delete password");
    }
  };

  const handleEdit = (id: string) => {
    console.log("Navigating to edit page for password ID:", id);
    router.push(`/passwords/${id}/edit`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Password Manager</h1>
        <Link
          href="/passwords/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <FaPlus /> Add New Password
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : passwords.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No passwords saved yet. Click "Add New Password" to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {passwords.map((password) => (
              <PasswordCard
                key={password.id}
                {...password}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
