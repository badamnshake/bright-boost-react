import Header from "../../../components/Header";
import { Box } from "@mui/material";
const AdminDashboard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
