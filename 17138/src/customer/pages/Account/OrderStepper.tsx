import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  { name: "Packed", description: "Item Packed in Dispatch Warehouse", value: "CONFIRMED" },
  { name: "Shipped", description: "by Mon, 15 Jul", value: "SHIPPED" },
  { name: "Arriving", description: "by 16 Jul", value: "ARRIVING" },
  { name: "Delivered", description: "on 18 Jul", value: "DELIVERED" },
];

const canceledSteps = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  { name: "Order Cancelled", description: "on Thu, 11 Jul", value: "CANCELLED" },
];

const currentStep = 3; // You can dynamically calculate this based on orderStatus if needed

const OrderStepper = ({ orderStatus }: any) => {
  const [statusSteps, setStatusSteps] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusSteps(canceledSteps);
    } else {
      setStatusSteps(steps);
    }
  }, [orderStatus]);

  return (
    <Box className="mx-auto my-10">
      {statusSteps.map((step, index) => (
        <div key={index} className="flex px-4">
          <div className="flex flex-col items-center">
            {/* Step Circle Icon */}
            <Box
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                ${index <= currentStep ? "bg-gray-200 text-teal-500" : "bg-gray-300 text-gray-600"}`}
            >
              {index <= currentStep ? (
                <CheckCircleIcon fontSize="small" />
              ) : (
                <FiberManualRecordIcon />
              )}
            </Box>

            {/* Connecting Line */}
            {index < statusSteps.length - 1 && (
              <div
                className={`border h-20 w-[2px] 
                  ${index < currentStep ? "bg-teal-500" : "bg-gray-300 text-gray-600"}`}
              ></div>
            )}
          </div>

          {/* Step Text Content */}
          <div className="ml-2 w-full">
            <div
              className={`p-2 rounded-md 
                ${step.value === orderStatus ? "bg-teal-500 text-white font-medium -translate-y-1" : ""}
                ${orderStatus === "CANCELLED" && step.value === "CANCELLED" ? "bg-red-500 text-white" : ""}`}
            >
              <p className="text-sm">{step.name}</p>
              <p
                className={`text-xs 
                  ${step.value === orderStatus ? "text-gray-200" : "text-gray-500"}`}
              >
                {step.description}
              </p>
            </div>
          </div>
          
        </div>
      ))}
    </Box>
  );
};

export default OrderStepper;
