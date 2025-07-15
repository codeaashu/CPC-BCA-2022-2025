import AdminHeader from "./AdminHeader";
import HeaderEmployee from "./HeaderEmployee";
import HeaderEmployer from "./HeaderEmployer";
import NormalHeader from "./NormalHeader";

const RoleNav = () => {
  const employee = JSON.parse(sessionStorage.getItem("active-employee"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const employer = JSON.parse(sessionStorage.getItem("active-employer"));

  if (employee != null) {
    return <HeaderEmployee />;
  } else if (admin != null) {
    return <AdminHeader />;
  } else if (employer != null) {
    return <HeaderEmployer />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
