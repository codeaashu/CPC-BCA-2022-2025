import React from "react";
import {
  MonetizationOn,
  ShoppingCart,
  PeopleAlt,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const stats = [
  {
    label: "Total Revenue",
    value: "₹1,25,000",
    icon: <MonetizationOn fontSize="large" className="text-green-600" />,
  },
  {
    label: "Total Orders",
    value: "324",
    icon: <ShoppingCart fontSize="large" className="text-blue-600" />,
  },
  {
    label: "Customers",
    value: "120",
    icon: <PeopleAlt fontSize="large" className="text-purple-600" />,
  },
];

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4780 },
  { name: "May", sales: 5890 },
  { name: "Jun", sales: 4390 },
];

const SellerDashboard = () => {
  const theme = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Welcome back, Seller! 🎉</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl transition-transform hover:scale-105"
            sx={{ color: "white" }}
          >
            <CardContent className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">{stat.icon}</div>
              <div>
                <Typography variant="body2" className="text-gray-300">
                  {stat.label}
                </Typography>
                <Typography variant="h6" className="font-semibold">
                  {stat.value}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6">
        <Typography variant="h6" className="mb-4 font-semibold">
          Monthly Sales Overview
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "8px",
                boxShadow: theme.shadows[2],
              }}
            />
            <Bar dataKey="sales" fill="#38bdf8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SellerDashboard;
