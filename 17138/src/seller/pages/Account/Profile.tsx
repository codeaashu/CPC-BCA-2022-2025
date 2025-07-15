import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerProfile } from "../../../State/seller/sellerSlice";
import { CircularProgress, Avatar, Chip } from "@mui/material";
import { Business, Email, Phone, VerifiedUser } from "@mui/icons-material";

const Profile = () => {
  const dispatch = useAppDispatch();
  // const { seller, loading, error } = useAppSelector((state) => state.seller);
  const { profile: seller, loading, error } = useAppSelector((state) => state.seller);


  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(fetchSellerProfile(jwt));
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-20">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-10">
      <h1 className="text-3xl font-bold mb-6">Seller Profile</h1>

      {seller && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Overview */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl space-y-3">
            <div className="flex items-center gap-4">
              <Avatar
                src={seller.businessDetails.logo}
                alt="Store Logo"
                sx={{ width: 60, height: 60 }}
              />
              <div>
                <h2 className="text-xl font-semibold">{seller.sellerName}</h2>
                <p className="text-sm text-gray-300">{seller.email}</p>
                <p className="text-sm text-gray-400">{seller.mobile}</p>
              </div>
            </div>
            <Chip
              label={seller.accountStatus}
              color="info"
              icon={<VerifiedUser />}
              className="mt-2"
            />
          </div>

          {/* Business Info */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl space-y-2">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Business fontSize="small" /> Business Details
            </h2>
            <p><strong>Name:</strong> {seller.businessDetails.businessName}</p>
            <p><strong>Email:</strong> {seller.businessDetails.businessEmail}</p>
            <p><strong>Phone:</strong> {seller.businessDetails.businessMobile}</p>
            <p><strong>Address:</strong> {seller.businessDetails.businessAddress}</p>
          </div>

          {/* Bank Info */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl space-y-2">
            <h2 className="text-lg font-bold mb-2">Bank Details</h2>
            <p><strong>Account No:</strong> {seller.bankDetails.accountNumber}</p>
            <p><strong>Account Holder:</strong> {seller.bankDetails.accountHolderName}</p>
            <p><strong>IFSC:</strong> {seller.bankDetails.ifscCode}</p>
          </div>

          {/* Pickup Address */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl space-y-2">
            <h2 className="text-lg font-bold mb-2">Pickup Address</h2>
            <p><strong>Name:</strong> {seller.pickupAddress.name}</p>
            <p><strong>City:</strong> {seller.pickupAddress.city}</p>
            <p><strong>State:</strong> {seller.pickupAddress.state}</p>
            <p><strong>Pincode:</strong> {seller.pickupAddress.pinCode}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
