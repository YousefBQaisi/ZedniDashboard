import { useState, useEffect } from "react";
import NavBar from "./component/NavBar";

import Footer from "./component/Footer";

import Users from "./component/Users";
import AddNew from "./component/AddNew";
import UserDetails from "./component/UserDetails";

import LogIn from "./component/LogIn";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UpdateUser from "./component/UpdateUser";
import Home from "./component/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("Token"));
  }, []);

  const handleLogIn = () => {
    setIsLoggedIn(localStorage.getItem("Token"));
  };

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <NavBar onPress={handleLogIn} />}

        <Routes>
          <Route
            path="/login"
            exact
            element={<LogIn onPress={handleLogIn} />}
          />
          <Route path="/users/addNew" element={<AddNew />} />
          <Route path="/users" element={<Users />} />
          <Route path="/home" element={<Home />} />
          <Route
            exact
            path="/"
            element={
              isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
            }
          />
          <Route path="/users/:userId" element={<UserDetails />} />
          <Route path="/users/edit/:userId" element={<UpdateUser />} />
        </Routes>
        {isLoggedIn && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
