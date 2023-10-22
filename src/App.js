import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import AdminDashboard from "./scenes/admin/admin-dashboard";

import QuestionQueue from "./scenes/teacher/question-queue";
import Attendance from "./scenes/teacher/attendance";
import AskQuestion from "./scenes/student/ask-question";
import Form from "./scenes/admin/form";
import Calendar from "./scenes/student/calendar";
import FAQ from "./scenes/student/faq";
import BarChartPage from "./scenes/admin/BarChartPage";
import PieChartPage from "./scenes/admin/PieChartPage";
import LineChartPage from "./scenes/admin/LineChartPage";
import Login from "./scenes/global/Login";
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
              <Route path="/form" element={<Form />}></Route>
              <Route path="/bar" element={<BarChartPage />}></Route>
              <Route path="/pie" element={<PieChartPage />}></Route>
              <Route path="/line" element={<LineChartPage />}></Route>
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
