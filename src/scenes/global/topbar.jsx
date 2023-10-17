import { Box, IconButton, useTheme, InputBase } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
// icons
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../../authProvider";

const Topbar = () => {
  const theme = useTheme();
  const { logout } = useAuth();
  const colors = tokens(theme.palette.mode);

  const colorMode = useContext(ColorModeContext);

  // box is similiar to a div
  // you can put css properties directly into box components
  // there some downsides and upsides both to this
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search bar  */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons Section */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (

            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={logout}>
          <LogoutOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
