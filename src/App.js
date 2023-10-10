import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import AdminDashboard from "./scenes/admin/admin-dashboard";

import Team from "./scenes/admin/team";
import Contacts from './scenes/admin/contacts';
import Invoices from './scenes/admin/invoices';
import Form from './scenes/admin/form';
import Calendar from './scenes/student/calendar';
import FAQ from './scenes/student/faq';
import BarChartPage from "./scenes/admin/BarChartPage";
import PieChartPage from "./scenes/admin/PieChartPage";
import LineChartPage from "./scenes/admin/LineChartPage";

function App() {
  const [theme, colorMode] = useMode();

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

              <Route path="/team" element={<Team />}></Route>
              <Route path="/contacts" element={<Contacts />}></Route>
              <Route path="/invoices" element={<Invoices />}></Route>
              <Route path="/form" element={<Form />}></Route>
              <Route path="/bar" element={<BarChartPage />}></Route>
              <Route path="/pie" element={<PieChartPage />}></Route>
              <Route path="/line" element={<LineChartPage />}></Route>
              <Route path="/faq" element={<FAQ />}></Route>
              <Route path="/calendar" element={<Calendar />}></Route>

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
