import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Auth = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setShowUserLogin, setUser, axios, navigate } = useContext(AppContext);

  const validateEmail = (email) => {
    const atCheck = email.includes("@");
    const dotCheck = email.includes(".");
    const domainCheck = /(gmail\.com|yahoo\.com)$/i.test(email);
    return { atCheck, dotCheck, domainCheck };
  };

  const validatePassword = (password) => {
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const symbolCheck = /[^A-Za-z0-9]/.test(password);
    const exactLengthCheck = password.length === 8;
    return { upperCheck, lowerCheck, numberCheck, symbolCheck, exactLengthCheck };
  };

  const emailChecks = validateEmail(email);
  const passwordChecks = validatePassword(password);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !emailChecks.atCheck ||
      !emailChecks.dotCheck ||
      !emailChecks.domainCheck ||
      !passwordChecks.upperCheck ||
      !passwordChecks.lowerCheck ||
      !passwordChecks.numberCheck ||
      !passwordChecks.symbolCheck ||
      !passwordChecks.exactLengthCheck
    ) {
      return;
    }

    try {
      const { data } = await axios.post(`/api/users/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        setUser(data.user);
        setShowUserLogin(false);
        navigate("/");
        toast.success("Login Successful");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail.includes("@") || !forgotEmail.includes(".")) {
      toast.error("Email must include '@' and '.' ");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/forgot-password", {
        email: forgotEmail,
      });
      toast.success(data.message);
      navigate("/verify-otp"); // ✅ NEW: take to OTP page
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 left-0 bottom-0 right-0 z-30 flex items-center justify-center bg-black/50 text-gray-600"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitHandler}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Type your name"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="text"
              required
            />
          </div>
        )}

        {!showForgot && (
          <>
            <div className="w-full">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Type your email"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
                type="email"
                required
              />
              {email && (
                <div className="text-xs text-red-500 mt-1 space-y-1">
                  {!emailChecks.atCheck && <p>• Must include '@'</p>}
                  {!emailChecks.dotCheck && <p>• Must include '.'</p>}
                  {!emailChecks.domainCheck && (
                    <p>• Must end with gmail.com or yahoo.com</p>
                  )}
                </div>
              )}
            </div>

            <div className="w-full relative">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Type your password"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
                type={showPassword ? "text" : "password"}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-sm cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
              {password && (
                <div className="text-xs text-red-500 mt-1 space-y-1">
                  {!passwordChecks.upperCheck && (
                    <p>• Must contain at least one uppercase letter</p>
                  )}
                  {!passwordChecks.lowerCheck && (
                    <p>• Must contain at least one lowercase letter</p>
                  )}
                  {!passwordChecks.numberCheck && (
                    <p>• Must contain at least one number</p>
                  )}
                  {!passwordChecks.symbolCheck && (
                    <p>• Must contain at least one symbol (e.g. @ # $)</p>
                  )}
                  {!passwordChecks.exactLengthCheck && (
                    <p>• Must be exactly 8 characters long</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {state === "login" && !showForgot && (
          <p
            className="text-sm text-blue-600 cursor-pointer underline"
            onClick={() => setShowForgot(true)}
          >
            Forgot Password?
          </p>
        )}

        {showForgot && (
          <div className="w-full">
            <p>Enter your registered email</p>
            <input
              onChange={(e) => setForgotEmail(e.target.value)}
              value={forgotEmail}
              placeholder="Type your email"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="email"
              required
            />
            {forgotEmail &&
              (!forgotEmail.includes("@") || !forgotEmail.includes(".")) && (
                <p className="text-xs text-red-500 mt-1">
                  Email must include '@' and '.'
                </p>
              )}
            <button
              onClick={handleForgotPassword}
              className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 mt-2 rounded-md cursor-pointer"
            >
              Send OTP
            </button>
            <p
              className="mt-2 text-sm cursor-pointer text-gray-500 underline"
              onClick={() => setShowForgot(false)}
            >
              Back to Login
            </p>
          </div>
        )}

        {!showForgot && (
          <>
            {state === "register" ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setState("login")}
                  className="text-indigo-500 cursor-pointer"
                >
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span
                  onClick={() => setState("register")}
                  className="text-indigo-500 cursor-pointer"
                >
                  Click here
                </span>
              </p>
            )}

            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
            >
              {state === "register" ? "Create Account" : "Login"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Auth;
