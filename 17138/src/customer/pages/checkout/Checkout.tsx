import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import AddressCard from "./AddressCard";
import Addressform from "./Addressform";
import PricingCard from "../Cart/PricingCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const paymentGateway = [
  {
    value:"Razorpay",
    image:"https://cdn.iconscout.com/icon/free/png-256/free-razorpay-logo-icon-download-in-svg-png-gif-file-formats--payment-gateway-brand-logos-icons-1399875.png?f=webp",
    label:""
  },
  
  {
    value:"Stripe",
    image:"data:image/png;base64,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",
    label:""
  }
];

const Checkout = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentMethod, setPaymentMethod] = React.useState("razorpay");

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Select Address</h1>
              <Button onClick={handleOpen}>Add New Address</Button>
            </div>
            <div className="text-xs font-medium space-y-5">
              <p>Saved Address</p>
              <div className="space-y-5">
                {[1, 2, 3].map((item) => (
                  <AddressCard key={item} />
                ))}
              </div>
            </div>
            <div className="py-4 px-5 border rounded-md space-y-3">
              <Button onClick={handleOpen}>Add New Address</Button>
            </div>
          </div>
          <div>
            <div>
              <div className="space-y-3 border p-5 rounded-md">
                <h1 className="text-primary-color font-medium  text-center">Choose Payment Method</h1>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="flex justify-between pr-0"

                >
                  {paymentGateway.map((gateway) => (
                    <FormControlLabel
                      key={gateway.value}
                      value={gateway.value}
                      control={<Radio />}
                      label={
                        <div className="flex items-center gap-2">
                          <img
                            src={gateway.image}
                            alt={gateway.label}
                            className="w-20 h-20 object-contain"
                            loading="lazy"
                          />
                          {gateway.label}
                        </div>
                      }
                    />
                  ))}
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                  
                  
                </RadioGroup>
              </div>
            </div>
            <div className="border rounded-md p-5 space-y-3">
              
              <PricingCard />
              <div className="p-3">
                <Button
                  variant="contained"
                  sx={{ py: "11px" }}
                  color="primary"
                  fullWidth
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Addressform paymentGateway={paymentGateway}/>
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
