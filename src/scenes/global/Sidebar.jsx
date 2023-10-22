import { useState, useEffect } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
// import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useAuth } from "../../authProvider";

/* ---------------------------------- icons --------------------------------- */
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tab } from "@testing-library/user-event/dist/tab";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        {/* <Link to={to} /> */}
      </MenuItem>
    </Link>
  );
};

const Sidebar = () => {
  const theme = useTheme();

  const { role } = useAuth();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [data, setData] = useState([]);

  // const getSessionData = async (values) => {
  //   const response = await axios.get(SESSION_URL);

  //   // console.log(response?.data.data);
  // };

  useEffect(() => {
    var userData = localStorage.getItem("user");
    if (userData) setData(JSON.parse(userData));
  }, [setData]);

  return (
    <Box>
      <ProSidebar
        rootStyles={{
          [`.ps-sidebar-container`]: {
            backgroundColor: `${colors.primary[400]}`,
          },
          "&.ps-menu-icon": {
            backgroundColor: "transparent",
          },
        }}
        collapsed={isCollapsed}
      >
        <Menu
          iconShape="square"
          rootStyles={{}}
          menuItemStyles={{
            button: ({ active }) => {
              return {
                backgroundColor: active ? colors.blueAccent[700] : undefined,
                borderRadius: active ? "8px" : undefined,
                fontWeight: active ? "bold" : undefined,
                "&:hover": {
                  backgroundColor: `${colors.blueAccent[700]} !important`,
                  borderRadius: "8px !important",
                },
              };
            },
            icon: () => ({
              backgroundColor: "transparent",
            }),
          }}
        >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Panel
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="200px"
                  height="100px"
                  src={`./bblogo.png`}
                  style={{ cursor: "pointer", borderRadius: "5%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {data.first_name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {data.email}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {role !== "admin" && (
              <Item
                title="Calendar"
                to="/calendar"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            {role === "teacher" && (
              <>
                <Item
                  title="Questions Queue"
                  to="/team"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Attendance"
                  to="/contacts"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {role === "student" && (
              <>
                <Item
                  title="Ask a Question"
                  to="/invoices"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="FAQ Page"
                  to="/faq"
                  icon={<HelpOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {role === "admin" && (
              <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Charts
                </Typography>
                <Item
                  title="Answers Chart"
                  to="/bar"
                  icon={<BarChartOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Attendance Chart"
                  to="/pie"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

// <Typography
//   variant="h6"
//   color={colors.grey[300]}
//   sx={{ m: "15px 0 5px 20px" }}
// >
//   Pages
// </Typography>
// <Item
//   title="Profile Form"
//   to="/form"
//   icon={<PersonOutlinedIcon />}
//   selected={selected}
//   setSelected={setSelected}
// />
