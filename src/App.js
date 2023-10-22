import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/topbar";
import AdminDashboard from "./scenes/admin/admin-dashboard";

import QuestionQueue from "./scenes/teacher/questionQueue";
import Attendance from "./scenes/teacher/attendance";
import AskQuestion from "./scenes/student/askQuestion";
import Calendar from "./scenes/student/calendar";
import FAQ from "./scenes/student/faq";
import AnswersChartPage from "./scenes/admin/answersChartPage";
import AttendanceChartPage from "./scenes/admin/attendanceChartPage";
import Login from "./scenes/global/login";
// import AuthProvider from './authProvider';
import { useAuth } from "./authProvider";
// import { useContext } from 'react';
import Sidebar from './scenes/global/sidebar';

function App() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();

  const { token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    navigate("/login");
    // return <Login />;
    return (
      <Routes>
        {/* Define your login route here */}
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* this will reset the css when needed */}
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<AdminDashboard />}></Route>

              <Route path="/team" element={<QuestionQueue />}></Route>
              <Route path="/contacts" element={<Attendance />}></Route>
              <Route path="/invoices" element={<AskQuestion />}></Route>
              <Route path="/bar" element={<AnswersChartPage />}></Route>
              <Route path="/pie" element={<AttendanceChartPage />}></Route>
              <Route path="/faq" element={<FAQ />}></Route>
              <Route path="/calendar" element={<Calendar />}></Route>

              {/* login route */}
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
