import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Users() {
  const navigate = useNavigate();
  const [showUsers, setShowUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4003/user");
      const reversedUsers = response.data.reverse();
      setShowUsers(reversedUsers);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4003/user/${userId}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Deleted!", "The user has been deleted.", "success");
              fetchData(); // Refresh the user list after deletion
            } else {
              Swal.fire(
                "Error",
                "An error occurred while deleting the user.",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error(error.message);
            Swal.fire(
              "Error",
              "An error occurred while deleting the user.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div class="mx-auto  max-w-4xl lg:mx-0 lg:max-w-none  lg:items-start ">
        <div class=" lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
          <div class="lg:pr-4">
            <div class="">
              <div style={{ height: "100vh", overflowY: "auto" }}>
                <div className="relative shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse">
                    <thead className="w-full text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-6 py-2">User Name</th>
                        <th className="px-8 py-2 flex justify-between items-center">
                          Actions
                          <div className="bg-blue-600 px-4 py-2 text-white rounded-lg">
                            <button onClick={() => navigate("/users/addNew")}>
                              Add New
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {showUsers.map((user) => (
                        <React.Fragment key={user._id}>
                          <tr>
                            <td className="py-4 pl-6 font-medium text-gray-800 bg-gray-400">
                              {user.name}
                            </td>
                            <td className="py-4 pr-8 flex items-center space-x-4 bg-gray-400">
                              <Link
                                to={`/users/${user._id}`}
                                className="text-white hover:underline rounded-lg bg-blue-600 px-4"
                              >
                                View
                              </Link>

                              <button
                                className="text-white bg-red-500 rounded-lg hover:underline px-4"
                                onClick={() => {
                                  deleteUser(user._id);
                                }}
                              >
                                Delete
                              </button>
                              <Link
                                to={`/users/edit/${user._id}`}
                                className="text-white rounded-lg bg-green-500 px-4 hover:underline"
                              >
                                Edit
                              </Link>
                            </td>
                          </tr>
                          <tr className="h-1 bg-gray-200"></tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
