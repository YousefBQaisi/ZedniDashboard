import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Logo from "../Assets/ZedniLogo.svg";

function NavBar({ onPress }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("Token"));

  const handleLogout = () => {
    // Perform logout actions here (clear local storage, reset state, etc.)
    localStorage.removeItem("Token"); // Remove the token from local storage
    setIsLoggedIn(false);
    onPress();
    navigate("login"); // Update the state to indicate the user is logged out
  };

  return (
    <nav class="bg-gray-200">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class=" inset-y-0 flex items-center ">
            <img src={Logo} className="h-20 m-1" alt=" Logo" />
            {/* <span className="text-white">زدني علما</span> */}
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="sm:ml-6">
              <div class="flex space-x-4">
                <NavLink
                  exact
                  to={"/home"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "bg-gray-300 text-gray-700 rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-700 hover:bg-gray-300 h rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to={"/users"}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "bg-gray-300 text-gray-700 rounded-md px-3 py-2 text-sm font-medium"
                      : "text-gray-700 hover:bg-gray-300 h rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Users
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-white bg-red-700 hover:bg-red-800 rounded-md px-3 py-2 text-sm font-medium"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
