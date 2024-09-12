import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NavLeft from "./Components/NavLeft.tsx";
import Analytics from "./routes/Analytics.tsx";
import { ThemeProvider, create } from "@emotion/react";
import { useColorContext } from "./context/ColorModeContext.tsx";
import Calendar from "./routes/Calendar.tsx";
import { Outlet } from "react-router-dom";
import PageNotFound from "./routes/PageNotFound.tsx";
import Navigation from "./routes/Navigation.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Crm from "./routes/Crm.tsx";
import Signup from "./Components/authentication/Signup.tsx";
import Login from "./Components/authentication/Login.tsx";
import Profile from "./routes/Profile.tsx";
import axios from "axios";
import Chat from "./routes/Chat.tsx"; // Add this import

function App() {
  const { theme } = useColorContext();
  let navigate = useNavigate();
  let token = sessionStorage.getItem("User");
  useEffect(() => {
    //save token in every axios request header
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      navigate("/login");
    }
  }, [token]);
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Routes>
          <Route path='*' element={<PageNotFound />} />
          <Route path='/' element={<Navigation />}>
            {/* Redirect from "/" to "/dashboard/analytics" */}
            <Route path='' element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Outlet />}>
              {/* Redirect from "/dashboard" to "/dashboard/analytics" */}
              <Route path='' element={<Navigate to='analytics' />} />
              <Route path='analytics' element={<Analytics />} />
              <Route path='crm' element={<Crm />} />
            </Route>
            <Route path='/calendar' element={<Calendar />}></Route>
            <Route path='/user-profile' element={<Profile />}></Route>
            <Route path='/chat' element={<Chat />}></Route>{" "}
            {/* Add this new route */}
          </Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
