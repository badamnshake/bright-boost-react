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
              {/* <Route path="/bar" element={<Bar />}></Route> */}
              {/* <Route path="/pie" element={<Pie />}></Route> */}
              {/* <Route path="/line" element={<Line />}></Route> */}
              <Route path="/faq" element={<FAQ />}></Route>
              {/* <Route path="/geography" element={<Geography />}></Route> */}
              <Route path="/calendar" element={<Calendar />}></Route>

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
