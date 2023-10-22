import { Box } from "@mui/material";
import Header from "../../components/header";
import AttendanceChart from "../../components/charts/attendanceChart";

const AttendanceChartPage = () => {
  return (
    <Box m="20px">
      <Header title="Attendance Chart" subtitle="Attendance of students in each session" />
      <Box height="75vh">
        <AttendanceChart />
      </Box>
    </Box>
  );
};

export default AttendanceChartPage;