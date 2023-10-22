import { Box, IconButton, useTheme, Typography, styled } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuth } from "../../authProvider";
import { useSessionID } from "./../../sessionIdProvider";

const Topbar = () => {
  const theme = useTheme();
  const { logout } = useAuth();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // Access the session ID from the context
  const { sessionName, sessionDate } = useSessionID();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Session ID Display */}
      {(sessionName && sessionDate) ? (
        <Box
          display="flex"
          alignItems="center"
          backgroundColor={colors.primary[400]}
          padding="4px 8px"
          borderRadius="4px"
        >
          <strong>Selected Session:</strong>
          <Typography variant="subtitle1" sx={{ color: colors.grey[400] }}>
            {sessionName}
          </Typography>
          &nbsp;
          <strong>Date:</strong>
          <Typography variant="subtitle1" sx={{ color: colors.grey[400] }}>
            {new Date(sessionDate).toLocaleString()}
          </Typography>
        </Box>
      ): <span></span>}

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
        <IconButton onClick={() => logout()}>
          <LogoutOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;