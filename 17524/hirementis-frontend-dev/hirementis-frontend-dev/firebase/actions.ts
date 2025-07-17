import axios from "axios";
import { db } from "./client";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// ✅ Initialize Auth and handle user state asynchronously
const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = await getUserDocument(user.uid);
    console.log("User data:", userData);
  } else {
    console.log("User not logged in");
  }
});

// ✅ Helper function: fetch interview by ID
export async function getInterviewById(
  id: string,
  userId: string,
  token?: string
): Promise<{
  data?: any;
  success?: boolean;
  error?: string;
}> {
  const res = await axios.post(
    "/api/interviews",
    {
      id,
      userId,
    },
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined
  );

  if (!res.data.success) {
    return { error: "Not found", success: false, data: null };
  }
  return { data: res.data, success: true };
}

// ✅ Helper function: fetch user document from Firestore
export async function getUserDocument(uid: string) {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    } else {
      console.log("User document not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user document:", error);
    return null;
  }
}

