"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Image from "next/image";

const MyOrders = () => {
  const { currency, getToken, user } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo orders for presentation
  const demoOrders = [
    {
      items: [
        {
          product: {
            name: "Boat Headphone",
            image: ["/bose_headphone_image.png"],
          },
          quantity: 1,
        },
      ],
      address: {
        fullName: "Anuj Kumar",
        area: "123 Main Station road",
        city: "Ara",
        state: "Bihar",
        phoneNumber: "9876543210",
      },
      totalAmount: 2999,
      date: new Date().toISOString(),
      status: "Delivered",
    },
    {
      items: [
        {
          product: {
            name: "Nikon Camera",
            image: ["/cannon_camera_image.png"],
          },
          quantity: 2,
        },
      ],
      address: {
        fullName: "Anuj Kumar",
        area: "456 Park view hotel",
        city: "Ara",
        state: "Bihar",
        phoneNumber: "9123456780",
      },
      totalAmount: 4999,
      date: new Date().toISOString(),
      status: "Shipped",
    },
  ];

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      if (!token) return toast.error("Please log in");

      const { data } = await axios.get("/api/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setOrders([...data.orders]);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Order fetch error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <h2 className="text-xl font-semibold mt-6 text-gray-800">My Orders</h2>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <div className="max-w-5xl border-t border-gray-300 text-sm mt-5">
              {(orders.length === 0 ? demoOrders : orders).map((order, index) => (
                <div className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300" key={index}>
                  {/* Product Info */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="w-16 h-16 object-cover rounded border"
                      src={
                        order.items?.[0]?.product?.image?.[0] || "/placeholder.png"
                      }
                      alt={order.items?.[0]?.product?.name || "Product"}
                      width={64}
                      height={64}
                    />
                    <div className="flex flex-col gap-2">
                      <span className="font-medium text-base text-gray-800">
                        {order.items
                          .map(
                            (item) =>
                              `${item.product?.name || "Product"} x ${item.quantity}`
                          )
                          .join(", ")}
                      </span>
                      <span className="text-gray-500">
                        Items: {order.items?.length || 0}
                      </span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="text-gray-600 min-w-[160px]">
                    {order.address ? (
                      <p>
                        <span className="font-medium text-gray-800">
                          {order.address.fullName}
                        </span>
                        <br />
                        {order.address.area}
                        <br />
                        {order.address.city}, {order.address.state}
                        <br />
                        {order.address.phoneNumber}
                      </p>
                    ) : (
                      <p className="text-red-500 text-xs">Address not available</p>
                    )}
                  </div>

                  {/* Total */}
                  <p className="font-medium my-auto text-gray-800 min-w-[100px] text-right">
                    {currency}
                    {order.totalAmount}
                  </p>

                  {/* Meta Info */}
                  <div className="text-gray-600 text-right min-w-[140px]">
                    <p className="flex flex-col">
                      <span>Method: COD</span>
                      <span>
                        Date:{" "}
                        {order.date
                          ? new Date(order.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </span>
                      <span>Status: {order.status || "Pending"}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default MyOrders;
