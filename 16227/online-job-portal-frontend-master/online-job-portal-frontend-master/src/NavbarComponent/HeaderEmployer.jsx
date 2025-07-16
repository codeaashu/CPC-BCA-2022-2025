import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderEmployer = () => {
  let navigate = useNavigate();

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-employer");
    sessionStorage.removeItem("employer-jwtToken");
    window.location.reload(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000); // Redirect after 3 seconds
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link
          to="/employer/job/post"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Add Job</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/employer/job/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">My Jobs</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/employer/job/application/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Job Applications</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default HeaderEmployer;
