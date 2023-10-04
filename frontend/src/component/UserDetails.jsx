import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserDetails.css";

function UserDetails() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4003/user/${userId}`)
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  return (
    <div class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div class="mx-auto  max-w-4xl lg:mx-0 lg:max-w-none  lg:items-start ">
        <div class=" lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
          <div class="lg:pr-4">
            <div class="">
              <div className="user-details-container">
                {user && (
                  <div className="user-details">
                    <h1 className="user-name">{user.name}</h1>
                    <div className="user-info">
                      <p className="user-item">
                        <span className="user-label">Password:</span>{" "}
                        {user.password}
                      </p>
                      <p className="user-item">
                        <span className="user-label">Email</span> {user.email}
                      </p>
                    </div>
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

export default UserDetails;
