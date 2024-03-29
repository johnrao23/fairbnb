import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLoader from "./components/AppLoader";
import HomePage from "./components/HomePage";
import Search from "./components/Search"
import Reservation from "./components/ReservationPage" 
import Confirmation from "./components/ConfirmationPage"
import Profile from "./components/UserProfile";
import Settings from "./components/Settings"
import About from "./components/AboutUs";
import Contact from "./components/Contact";
import AskAi from "./components/AskAi"
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SignUp from "./Backend/UserActions/Signup/SignUpPage";
import SignIn from "./Backend/UserActions/Signin/SignInPage";
import { watchAuthState } from "./Backend/Firebase/firebaseUtils";

function App() {

  useEffect(() => {
    watchAuthState();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <AppLoader />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="Sign-Up" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reserve"
            element={
              <ProtectedRoute>
                <Reservation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirmation"
            element={
              <ProtectedRoute>
                <Confirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/askai"
            element={
              <ProtectedRoute>
                <AskAi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contactus"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

