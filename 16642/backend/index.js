require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const authRoute = require("./Routes/AuthRoute");
const razorpayRoutes = require("./Routes/razorpayRoutes"); // Razorpay route
const { HoldingsModel } = require("./Models/HoldingsModel");
const { PositionsModel } = require("./Models/PositionsModel");
const { OrdersModel } = require("./Models/OrdersModel");
const PaymentModel = require("./Models/PaymentModel"); // ✅ Added

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// ✅ CORS config
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }) 
);

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ✅ Routes
app.use("/", authRoute);
app.use("/", razorpayRoutes); // includes /create-order & /verify-payment

// ✅ Razorpay: Fetch all payments
app.get("/payments", async (req, res) => {
  try {
    const payments = await PaymentModel.find({}).sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Niveshpro specific routes
app.get("/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    // 1. Save the order
    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();

    // 2. Only handle BUY mode for holdings
    if (mode === "BUY") {
      const existing = await HoldingsModel.findOne({ name });

      if (existing) {
        // Weighted average price
        const totalQty = existing.qty + qty;
        const totalValue = existing.qty * existing.avg + qty * price;
        const newAvg = totalValue / totalQty;

        await HoldingsModel.updateOne(
          { name },
          {
            $set: { avg: newAvg },
            $inc: { qty: qty }
          }
        );
      } else {
        await HoldingsModel.create({
          name,
          qty,
          avg: price,
          price,           // set current price same as buy price for now
          net: "0.00%",
          day: "0.00%",
          isLoss: false
        });
      }
    }

    res.status(200).json({ message: "✅ Order processed and holdings updated" });
  } catch (err) {
    console.error("❌ Error in /newOrder:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.get("/orders", async (req, res) => {
  const orders = await OrdersModel.find();
  res.json(orders);
});

// ✅ Start server after DB connects
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ DB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err);
  });
