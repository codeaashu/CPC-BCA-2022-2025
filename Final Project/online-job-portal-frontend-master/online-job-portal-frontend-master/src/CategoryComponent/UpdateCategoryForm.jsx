import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UpdateCategoryForm = () => {
  const location = useLocation();
  const category = location.state;
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [id, setId] = useState(category.id);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);

  let navigate = useNavigate();

  const saveCategory = (e) => {
    let data = { id, name, description };

    fetch("http://localhost:8080/api/job/category/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(data),
    })
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
              navigate("/admin/job/category/all");
            }, 2000); // Redirect after 3 seconds
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
            }, 2000); // Redirect after 3 seconds
          } else {
            toast.error("It Seems Server is down!!!", {
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
            }, 2000); // Redirect after 3 seconds
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
    e.preventDefault();
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div class="form-card border-color" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >
              <h5 class="card-title">Update Job Category</h5>
            </div>
            <div class="card-body text-color mt-3">
              <form>
                <div class="mb-3">
                  <label for="title" class="form-label">
                    <b>Category Title</b>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="enter title.."
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">
                    <b>Category Description</b>
                  </label>
                  <textarea
                    class="form-control"
                    id="description"
                    rows="3"
                    placeholder="enter description.."
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={description}
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    onClick={saveCategory}
                    class="btn bg-color custom-bg-text"
                  >
                    Update Category
                  </button>
                </div>

                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryForm;
