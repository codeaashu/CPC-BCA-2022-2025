import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewAllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllCategory = async () => {
      const allCategories = await retrieveAllCategory();
      if (allCategories) {
        setAllCategories(allCategories.categories);
      }
    };

    getAllCategory();
  }, []);

  const retrieveAllCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/job/category/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  const deleteCategory = (categoryId, e) => {
    fetch(
      "http://localhost:8080/api/job/category/delete?categoryId=" + categoryId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    )
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  const updateCategory = (category) => {
    navigate("/admin/job/category/update", { state: category });
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
          <h2>All Job Categories</h2>
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
                  <th scope="col">Category Id</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allCategories.map((category) => {
                  return (
                    <tr>
                      <td>
                        <b>{category.id}</b>
                      </td>
                      <td>
                        <b>{category.name}</b>
                      </td>
                      <td>
                        <b>{category.description}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => updateCategory(category)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Update
                        </button>

                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Delete
                        </button>
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

export default ViewAllCategories;
