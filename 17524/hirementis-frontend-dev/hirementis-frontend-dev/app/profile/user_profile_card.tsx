import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth, db } from "@/firebase/client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";

interface UserData extends User {
  displayName: string;
  email: string;
  bio: string;
  profilePicture?: string;
  resume?: string;
  interviews: any[];
}

const UserProfileCard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [editingBio, setEditingBio] = useState(false);
  const [bio, setBio] = useState("");

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data() as UserData;
          setUser({
            ...data,
            photoURL: data.photoURL || currentUser.photoURL || "",
            bio: typeof data.bio === "string" ? data.bio : "",
          });
          setBio(typeof data.bio === "string" ? data.bio : "");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleSaveBio = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { bio });
      setEditingBio(false);
      setUser((prev) => (prev ? { ...prev, bio } : prev));
    } catch (err) {
      console.error("Error updating bio:", err);
    }
  };

  if (!user) {
    return (
      <Card className="lg:col-span-1 border-emerald-100">
        <CardHeader className="pb-2">
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-1 border-emerald-100">
      <CardHeader className="pb-2">
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Your personal details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-3xl font-medium text-emerald-600 mb-4 overflow-hidden">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user.displayName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
            )}
          </div>
          <h2 className="text-xl font-semibold">{user.displayName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Bio</h3>
            {editingBio ? (
              <div className="flex flex-col gap-2">
                <textarea
                  className="border rounded p-2 w-full"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveBio}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingBio(false);
                      setBio(user.bio || "");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="mt-1">
                  {user.bio || (
                    <span className="text-gray-400">No bio added.</span>
                  )}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingBio(true)}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
          {user.resume && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Resume</h3>
              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 underline text-xs"
              >
                View Resume
              </a>
            </div>
          )}
          {/* <div>
            <h3 className="text-sm font-medium text-gray-500">Stats</h3>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <div className="p-2 bg-gray-50 rounded-md">
                <div className="text-lg font-semibold">
                  {user.interviews?.length || 0}
                </div>
                <div className="text-xs text-gray-500">Interviews</div>
              </div>
              <div className="p-2 bg-gray-50 rounded-md">
                <div className="text-lg font-semibold">
                  {user.interviews && user.interviews.length > 0
                    ? Math.round(
                        user.interviews.reduce(
                          (acc, interview) => acc + (interview.score || 0),
                          0
                        ) / user.interviews.length
                      )
                    : 0}
                  %
                </div>
                <div className="text-xs text-gray-500">Avg. Score</div>
              </div>
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
