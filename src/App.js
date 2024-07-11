import React from "react";
import Navbar from "./Components/Navbar";
import "./App.css";
import Home from "./Components/pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Reservation from "./Components/pages/Reservation";
import About from "./Components/pages/About";
import SignUp from "./Components/pages/SignUp";
import PrivateRoute from "./Components/pages/PrivateRoute";






const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  // app.js



  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/reservation" element={isAuthenticated ? <Reservation /> : <Navigate to="/SignUp" />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/PrivateRoute" element={isAuthenticated ? <PrivateRoute /> : <Navigate to="/SignUp" />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
