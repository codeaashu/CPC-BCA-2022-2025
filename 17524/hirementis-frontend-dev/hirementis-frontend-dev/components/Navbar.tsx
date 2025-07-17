"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { auth } from "@/firebase/client";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { getUserDocument } from "@/firebase/actions";
import { UserProfile } from "@/types";
import { useUserStore } from "@/hooks/userUser";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const isInterviewPage = pathname?.startsWith("/interview");
  const router = useRouter();
  const {
    setUser: setUserState,
    setIsAuthenticated,
    user: userState,
  } = useUserStore();

  async function getUserDoc() {
    const currUser = auth.currentUser;
    if (!currUser?.uid) return;
    const userDoc = await getUserDocument(currUser.uid);
    if (userDoc) {
      setUserState(userDoc as UserProfile);
      setIsAuthenticated();
    } else {
      setUserState(null);
    }
  }

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.emailVerified) {
        // setUser(firebaseUser);
        getUserDoc();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleNavlinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
    setUserState(null);
    setIsAuthenticated();
    toast.success("Logged out successfully");
  };

  if (isInterviewPage) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center select-none">
            <Link
              onClick={handleNavlinkClick}
              href="/"
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-white font-extrabold ">
                <span className="inline-block">E</span>
              </div>
              <span className="text-lg font-bold">EduPrep-AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              onClick={handleNavlinkClick}
              href="/"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Home
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/jobs"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Jobs
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#features"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Features
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#how-it-works"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              How it works
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#pricing"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              onClick={handleNavlinkClick}
              href="/#testimonials"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              Testimonials
            </Link>
          </div>

          {/* CTA Buttons and User Profile */}
          <div className="hidden md:flex items-center gap-4">
            {!userState ? (
              <>
                <Link onClick={handleNavlinkClick} href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link onClick={handleNavlinkClick} href="/signup">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    Sign Up Free
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border border-red-500 text-red-400 hover:bg-red-50 hover:text-red-300 hover:border-red-400"
                >
                  Logout
                </Button>
                {/* User Profile Avatar */}
                <div
                  className="ml-2 cursor-pointer"
                  onClick={() => router.push("/profile")}
                  title="Profile"
                >
                  <div className="w-10 h-10 select-none rounded-full text-xs bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-300 hover:bg-emerald-200 transition">
                    {userState?.profilePicture ? (
                      <div>
                        <Image
                          src={userState?.profilePicture || ""}
                          alt="User Avatar"
                          className="w-full h-full rounded-full object-cover"
                          width={100}
                          height={100}
                        />
                      </div>
                    ) : userState.displayName ? (
                      userState.displayName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    ) : (
                      userState.email?.[0]?.toUpperCase() || "U"
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                onClick={handleNavlinkClick}
                href="/"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                Home
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="/jobs"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                Jobs
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="/#features"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                Features
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="/#how-it-works"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                How it works
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="/#pricing"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                Pricing
              </Link>
              <Link
                onClick={handleNavlinkClick}
                href="/#testimonials"
                className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
              >
                Testimonials
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                {!userState ? (
                  <>
                    <Link
                      onClick={handleNavlinkClick}
                      href="/login"
                      className="w-full"
                    >
                      Login
                    </Link>
                    <Link
                      onClick={handleNavlinkClick}
                      href="/signup"
                      className="w-full"
                    >
                      <Button className="w-full justify-center bg-emerald-500 hover:bg-emerald-600 text-white">
                        Sign Up Free
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-center border-red-500 text-red-400 hover:bg-red-50 hover:text-red-300 hover:border-red-400"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                    {/* User Profile Avatar (Mobile) */}
                    <div
                      className="w-full flex justify-center mt-2"
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push("/profile");
                      }}
                    >
                      <div
                        className="w-10 h-10 select-none rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs border border-emerald-300 hover:bg-emerald-200 transition cursor-pointer"
                        title="Profile"
                      >
                        {userState?.profilePicture ? (
                          <div>
                            <Image
                              src={userState?.profilePicture || ""}
                              alt={userState?.displayName || "User avatar"}
                              width={100}
                              height={100}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                        ) : userState.displayName ? (
                          userState.displayName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        ) : (
                          userState.email?.[0]?.toUpperCase() || "U"
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
