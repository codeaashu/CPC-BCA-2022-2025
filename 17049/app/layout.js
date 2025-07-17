import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext"; // ✅ your new context
import { Toaster } from "react-hot-toast";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "E-shop",
  description: "E-Commerce with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`}>
        <Toaster />
        <AuthProvider>
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
