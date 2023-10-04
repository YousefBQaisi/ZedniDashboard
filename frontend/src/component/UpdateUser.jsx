import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDetails.css"; // Import your CSS file for styling
const Swal = require("sweetalert2");

function UpdateUser() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Use Axios to fetch user data
    axios
      .get(`http://localhost:4003/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const updateUser = () => {
    axios
      .patch(`http://localhost:4003/user/${userId}`, user)
      .then((response) => {
        if (response.status === 200) {
          console.log("User updated successfully!");
          Swal.fire({
            title: "Successfully Updated",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/users");

          // You can add a success message or redirect to another page after updating
        } else {
          console.error("Error updating user.");
          // Handle error here
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        // Handle error here
      });
  };

  return (
    <div class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div class="mx-auto  max-w-4xl lg:mx-0 lg:max-w-none  lg:items-start ">
        <div class=" lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
          <div class="lg:pr-4">
            <div class="">
              <div className="user-details-container">
                {user && (
                  <div className="user-details">
                    <h1 className="user-name">Update User</h1>
                    <form>
                      <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={user.name || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={user.password || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="salary">Email:</label>
                        <input
                          type="number"
                          id="salary"
                          name="salary"
                          value={user.salary || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </form>
                    <button className="button1" onClick={updateUser}>
                      Update
                    </button>
                  </div>
                )}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
