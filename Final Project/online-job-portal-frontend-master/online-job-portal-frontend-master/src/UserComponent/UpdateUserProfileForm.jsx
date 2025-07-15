import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateUserProfileForm = () => {
  const employee = JSON.parse(sessionStorage.getItem("active-employee"));
  const employee_jwtToken = sessionStorage.getItem("employee-jwtToken");

  let navigate = useNavigate();

  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedResume, setSelectResume] = useState(null);

  const [profile, setProfile] = useState({
    userId: employee.id,
    bio: "",
    website: "",
    linkedlnProfileLink: "",
    githubProfileLink: "",
    profilePic: "",
    resume: "",
  });

  const handleInput = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveUserProfile = (e) => {
    e.preventDefault();
    if (profile === null) {
      toast.error("invalid input!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const formData = new FormData();
    formData.append("userId", profile.userId);
    formData.append("bio", profile.bio);
    formData.append("website", profile.website);
    formData.append("githubProfileLink", profile.githubProfileLink);
    formData.append("linkedlnProfileLink", profile.linkedlnProfileLink);
    formData.append("resume", selectedResume);
    formData.append("profilePic", selectedImage1);

    axios
      .put("http://localhost:8080/api/user/profile/add", formData, {
        headers: {
          Authorization: "Bearer " + employee_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/employee/profile/detail");
          }, 2000); // Redirect after 3 seconds
        } else if (!response.success) {
          toast.error(response.responseMessage, {
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
        }, 2000); // Redirect after 3 seconds
      });
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center mb-4">
        <div class="card form-card shadow-lg" style={{ width: "60rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 text-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 class="card-title">Update Profile</h5>
            </div>
            <div class="card-body text-color">
              <form className="row g-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Bio</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bio"
                    name="bio"
                    onChange={handleInput}
                    value={profile.bio}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Website</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="website"
                    onChange={handleInput}
                    value={profile.website}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Github Link</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="githubProfileLink"
                    onChange={handleInput}
                    value={profile.githubProfileLink}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>LinkedIn Profile Link</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="linkedlnProfileLink"
                    onChange={handleInput}
                    value={profile.linkedlnProfileLink}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select Profile Pic</b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="profilePic"
                    onChange={(e) => setSelectImage1(e.target.files[0])}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select Resume</b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="resume"
                    onChange={(e) => setSelectResume(e.target.files[0])}
                    required
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text"
                    onClick={saveUserProfile}
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfileForm;
