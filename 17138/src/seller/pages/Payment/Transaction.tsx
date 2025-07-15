// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function TransactionTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Date</StyledTableCell>
            
//             <StyledTableCell align="right">Customer Details</StyledTableCell>
//             <StyledTableCell align="right">Order</StyledTableCell>
//             <StyledTableCell align="right">Amount</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.name}>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>
              
//               <StyledTableCell align="right">{row.fat}</StyledTableCell>
//               <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//               <StyledTableCell align="right">{row.protein}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }


import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// 3D Glassmorphism container
const GlassPaper = styled(Paper)(() => ({
  backdropFilter: "blur(14px)",
  background: "rgba(255, 255, 255, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: "1rem",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
  overflow: "hidden",
}));
// Styled table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#fff",
    fontWeight: "bold",
    textShadow: "0 1px 1px rgba(0,0,0,0.4)",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "#eee",
    fontSize: 14,
    backdropFilter: "blur(2px)",
  },
}));


const StyledTableRow = styled(TableRow)(() => ({
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "scale(1.01)",
    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
  },
}));

// Dummy data (replace with backend data)
const rows = [
  {
    date: "2025-07-14",
    customer: "Shyam Kumar",
    orderId: "ORD123456",
    amount: "₹2,499.00",
  },
  {
    date: "2025-07-13",
    customer: "Priya Sharma",
    orderId: "ORD123457",
    amount: "₹1,299.00",
  },
  {
    date: "2025-07-13",
    customer: "Ravi Patel",
    orderId: "ORD123458",
    amount: "₹3,750.00",
  },
];

export default function TransactionTable() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 drop-shadow">
        Recent Transactions
      </h2>
      <GlassPaper className="backdrop-blur-lg border border-gray-700">
        <TableContainer>
          <Table aria-label="transaction table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Customer</StyledTableCell>
                <StyledTableCell>Order ID</StyledTableCell>
                <StyledTableCell align="right">Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <StyledTableRow key={idx}>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>{row.customer}</StyledTableCell>
                  <StyledTableCell>{row.orderId}</StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </GlassPaper>
    </div>
  );
}
