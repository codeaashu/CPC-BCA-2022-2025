import { useState } from "react";
import { FaEye, FaEyeSlash, FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

interface PasswordCardProps {
  id: string;
  title: string;
  username: string;
  password: string;
  website?: string;
  notes?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PasswordCard({
  id,
  title,
  username,
  password,
  website,
  notes,
  onEdit,
  onDelete,
}: PasswordCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard!`);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleEdit = () => {
    console.log("Editing password with ID:", id);
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-600"
            aria-label="Edit password"
          >
            <FaEdit />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600"
            aria-label="Delete password"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Username:</span>
          <span className="flex-1 text-black">{username}</span>
          <button
            onClick={() => copyToClipboard(username, "Username")}
            className="text-gray-500 hover:text-gray-600"
            aria-label="Copy username"
          >
            <FaCopy />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600">Password:</span>
          <span className="flex-1  text-black">{showPassword ? password : "••••••••"}</span>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button
            onClick={() => copyToClipboard(password, "Password")}
            className="text-gray-500 hover:text-gray-600"
            aria-label="Copy password"
          >
            <FaCopy />
          </button>
        </div>

        {website && (
          <div className="text-gray-600">
            <span>Website: </span>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {website}
            </a>
          </div>
        )}

        {notes && (
          <div className="text-gray-600">
            <span>Notes: </span>
            <span>{notes}</span>
          </div>
        )}
      </div>
    </div>
  );
}
