import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  const currency = "₹";

  const cleanPrice = (raw) => {
    if (typeof raw === "number") return raw;
    if (!raw) return 0;
    const onlyNumber = String(raw).replace(/[^0-9.]/g, "");
    return Number(onlyNumber) || 0;
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      {orders.map((order) =>
        order.items.map((item, idx) => {
          const rawOfferPrice = item.product?.offerPrice;
          const unitPrice = cleanPrice(rawOfferPrice);
          const finalPrice =
            unitPrice *
            item.quantity *
            (item.weight ? item.weight / 500 : 1);

          return item.product ? (
            <div
              key={idx}
              className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
            >
              <div className="flex gap-5">
                <img
                  className="w-12 h-12 object-cover opacity-60"
                  src={item.product.image?.[0] || ""}
                  alt="Product"
                />
                <p className="font-medium">
                  {item.product.name}{" "}
                  <span
                    className={`text-indigo-500 ${
                      item.quantity < 2 && "hidden"
                    }`}
                  >
                    x {item.quantity}
                  </span>
                </p>
              </div>

              <div className="text-sm">
                {order.address ? (
                  <>
                    <p className="font-medium mb-1">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p>
                      {order.address.street}, {order.address.city},{" "}
                      {order.address.state}, {order.address.zipCode},{" "}
                      {order.address.country}
                    </p>
                  </>
                ) : (
                  <p className="text-red-500">No address provided</p>
                )}
              </div>

              <p className="font-medium text-base text-black/70">
                {currency}
                {finalPrice.toFixed(2)}
              </p>

              <div className="flex flex-col text-sm">
                <p>Method: {order.paymentType}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              </div>
            </div>
          ) : (
            <div
              key={idx}
              className="p-5 border border-red-300 text-red-500"
            >
              Product not found for this item.
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
