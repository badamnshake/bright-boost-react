import { Box, Typography, useTheme, Button } from "@mui/material";
import React, { useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import axios from "../../api/axios";


const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({});
  const handleClick = () => {
    console.log(data)
    // Add your click event handling logic here
    const postData = {
      session_id: '2',
      student_id: 'f4edde66-8c68-416f-bd1b-b54e37c0d1fb',
    };

    axios
      .post('/items/Question', postData)
      .then((response) => {
        // Handle the response from the server
        setData(response.data);
        alert('Added in the Queue!');
      })
      .catch((error) => {
        // Handle any errors
        alert('An error occurred.');
        console.error(error);
      });
  };
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '80px', // This ensures the content takes the full viewport height
    // width: '250px',
  };
  // const columns = [
  //   { field: "id", headerName: "ID" },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     flex: 1,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "phone",
  //     headerName: "Phone Number",
  //     flex: 1,
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     flex: 1,
  //   },
  //   {
  //     field: "cost",
  //     headerName: "Cost",
  //     flex: 1,
  //     renderCell: (params) => (
  //       <Typography color={colors.greenAccent[500]}>
  //         ${params.row.cost}
  //       </Typography>
  //     ),
  //   },
  //   {
  //     field: "date",
  //     headerName: "Date",
  //     flex: 1,
  //   },
  // ];

  return (
    <Box m="20px">
      <Header title="Ask a Question" subtitle="Press the button to get in the queue." />
      {/* <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box> */}
      <Box style={centerStyle}>
      <Button variant="contained" color="primary" onClick={handleClick} style={{ width: '250px', height: '80px' }}>
        Click Me
      </Button>
    </Box>
    </Box>
  );
};

export default Invoices;