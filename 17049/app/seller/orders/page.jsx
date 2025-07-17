"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, token, user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerOrders = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get("/api/order/seller-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerOrders();
    }
  }, [user]);

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Orders</h2>
          <div className="max-w-4xl rounded-md">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500">No orders yet.</p>
            ) : (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
                >
                  {/* Order Summary */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="max-w-16 max-h-16 object-cover"
                      src={assets.box_icon}
                      alt="box_icon"
                    />
                    <div className="flex flex-col gap-3">
                      <span className="font-medium text-gray-800">
                        {order.items
                          .filter((item) => item.product)
                          .map(
                            (item) =>
                              `${item.product.name} x ${item.quantity}`
                          )
                          .join(", ")}
                      </span>
                      <span className="text-gray-500">
                        Items:{" "}
                        {order.items?.filter((item) => item.product).length || 0}
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
                      <p className="text-red-500 text-xs">
                        Address not available
                      </p>
                    )}
                  </div>

                  {/* Amount */}
                  <p className="font-medium my-auto text-gray-800 min-w-[100px] text-right">
                    {currency}
                    {order.amount}
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
              ))
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Orders;
