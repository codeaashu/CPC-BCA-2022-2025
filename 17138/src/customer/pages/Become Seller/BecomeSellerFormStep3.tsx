import { TextField } from '@mui/material';
import React from 'react'

interface BecomeSellerFormStep2Props {
    formik: any;
    }

const BecomeSellerFormStep3:React.FC<BecomeSellerFormStep2Props> = ({formik}) => {
  return (
    <div className='space-y-9'>

        <TextField
          fullWidth
          label="Account Number"
          name="bankDetails.accountNumber"
          value={formik.values.bankDetails.accountNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bankDetails?.accountNumber && Boolean(formik.errors.bankDetails?.accountNumber)}
          helperText={formik.touched.bankDetails?.accountNumber && formik.errors.bankDetails?.accountNumber}
          required
          />
        <TextField
          fullWidth
          label="IFSC Code"
          name="bankDetails.ifscCode"
          value={formik.values.bankDetails.ifscCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bankDetails?.ifscCode && Boolean(formik.errors.bankDetails?.ifscCode)}
          helperText={formik.touched.bankDetails?.ifscCode && formik.errors.bankDetails?.ifscCode}
          required
            />
        <TextField
          fullWidth
          label="Account Holder Name"
          name="bankDetails.accountHolderName"
          value={formik.values.bankDetails.accountHolderName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bankDetails?.accountHolderName && Boolean(formik.errors.bankDetails?.accountHolderName)}
          helperText={formik.touched.bankDetails?.accountHolderName && formik.errors.bankDetails?.accountHolderName}
          required
            />

    </div>
  )
}

export default BecomeSellerFormStep3