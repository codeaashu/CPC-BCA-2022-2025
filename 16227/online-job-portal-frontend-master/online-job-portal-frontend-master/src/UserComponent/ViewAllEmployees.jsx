import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllEmployees = () => {
  const [allEmployee, setAllEmployee] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser();
      if (allUsers) {
        setAllEmployee(allUsers.users);
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Employee",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>All Employees</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {allEmployee.map((employee) => {
                  return (
                    <tr>
                      <td>
                        <b>{employee.firstName}</b>
                      </td>
                      <td>
                        <b>{employee.lastName}</b>
                      </td>
                      <td>
                        <b>{employee.emailId}</b>
                      </td>
                      <td>
                        <b>{employee.phoneNo}</b>
                      </td>
                      <td>
                        <b>
                          {employee.address.street +
                            ", " +
                            employee.address.city +
                            ", " +
                            employee.address.pincode}
                        </b>
                      </td>
                      <td>
                        <b>{formatDateFromEpoch(employee.registrationDate)}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllEmployees;
