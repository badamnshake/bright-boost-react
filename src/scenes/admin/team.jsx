import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "./../../theme";
import { mockDataTeam } from "./../../data/mockData";
import { useState, useEffect } from "react";

/* ------------------------------------ - ----------------------------------- */
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import axios from "../../api/axios";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Users = "/items/Question?field=*,student_id.first_name";
  const [data, setData] = useState([]);
  const getSessionData = async (values) => {
    const response = await axios.get(Users);
    setData(response?.data?.data);
    console.log(response?.data.data);
    // console.log(data.student_id);
  };
  
  useEffect(() => {
    getSessionData();
  }, []);
  
  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    // },
    {
      field: "student_id",
      headerName: "NAME",
      flex: 1,
      cellClassName: 'name-column-cell'
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left"
    // },

    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1
    // },

    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1
    // },

    {
      field: "answer",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({row: {access}}) => {
        return (
            <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
                access === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
            >
                {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                {access === "manager" && <SecurityOutlinedIcon />}
                {access === "user" && <LockOpenOutlinedIcon />} */}


                <Typography color={colors.grey[100]} sx={{ ml: "5px"}}>
                    Mark as Answered
                </Typography>

            </Box>
        )

      }
    },
  ];

  // we need to define pixel height
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="managing the team members"></Header>
      <Box
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
        <DataGrid rows={data} columns={columns}
        
        
        />
      </Box>
    </Box>
  );
};
export default Team;
