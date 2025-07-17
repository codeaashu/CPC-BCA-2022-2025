import { useEffect } from "react";

const LoginRedirect = () => {
  useEffect(() => {
    window.location.href = "http://localhost:3000/login";
  }, []);

  return <p>Redirecting to login...</p>;
};

export default LoginRedirect;
