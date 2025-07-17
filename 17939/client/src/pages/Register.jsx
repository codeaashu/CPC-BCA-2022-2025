import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import indianCities from "../data/indianCities";
import allColleges from "../data/allColleges";
import { Eye, EyeOff } from 'lucide-react';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    workStatus: "",
    qualification: "",
    specialization: "",
    college: "",
    city: "",
    skills: [],
    resume: null,
    picture: ""
  });

  const { backendUrl } = useContext(AppContext);

  const [step, setStep] = useState(1);
  const [skillInput, setSkillInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const qualificationOptions = ["BCA", "B.Tech", "M.Tech", "B.Sc", "MBA", "BBA", "B.Com", "M.Com"];
  const specializationOptions = ["Computer Science", "Finance", "HR", "Marketing", "Data Science", "Information Technology", "Business Analytics"];

  const filteredCities = indianCities.filter(city => city.toLowerCase().startsWith(form.city.toLowerCase()));
  const filteredColleges = allColleges.filter(college => college.toLowerCase().includes(form.college.toLowerCase()));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && (/\D/.test(value) || value.length > 10)) return;

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
      const isValid = emailRegex.test(value);
      setEmailError(isValid ? "" : "Invalid email format");
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const isPasswordValid = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/.test(password);
  };

  const handleWorkStatus = (status) => {
    setForm(prev => ({ ...prev, workStatus: status }));
  };

  const addSkill = () => {
    if (skillInput && !form.skills.includes(skillInput)) {
      setForm(prev => ({ ...prev, skills: [...prev.skills, skillInput] }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.credential}`);
      const { name, email, picture } = res.data;

      setForm(prev => ({
        ...prev,
        name: name || prev.name,
        email: email || prev.email,
        picture: picture || prev.picture
      }));

      toast.success("Google login successful. Please complete the form.");
      setStep(2);
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "skills") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "resume" || key === "picture") {
          if (value) formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });

      const res = await axios.post(`${backendUrl}/api/users/register`, formData);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom right, #fbc2eb, #a6c1ee, #c084fc)" }}>
        <h1 className="text-5xl font-extrabold mb-4 transition-transform duration-300 hover:scale-105">
          <span className="text-blue-500 hover:text-blue-600 transition-colors duration-300">Career</span>
          <span className="text-green-400 hover:text-green-500 transition-colors duration-300">Connect</span>
        </h1>
        <p className="mb-6 text-md text-center">Create your CareerConnect profile</p>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error("Google Login Failed")} />
        <Link to="/login" className="mt-6 underline text-sm text-white hover:text-blue-200">Already have an account? Login</Link>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-2xl animate-blob z-0"></div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-10 bg-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create your CareerConnect profile</h1>
          <p className="text-blue-600 font-medium mt-1 text-sm">Search and apply to jobs</p>
        </div>

        {form.picture && (
          <div className="flex justify-center mb-4">
            <img src={form.picture} alt="Profile" className="w-16 h-16 rounded-full shadow" />
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="What is your name?" className="input" required />
              </div>

              <div>
                <label className="block text-sm font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Tell us your email"
                  className="input"
                  required
                />
                {emailError && (
                  <p className="text-xs text-red-600 mt-1">{emailError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    className="input pr-10"
                    required
                  />
                  <span
                    className="absolute top-2 right-3 text-gray-600 cursor-pointer"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
                {form.password.length > 0 && !isPasswordValid(form.password) && (
                  <p className="text-xs text-red-600 mt-1">
                    Must contain at least 1 number, 1 special character, and be 6+ characters
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold">Phone Number</label>
                <div className="flex gap-2">
                  <span className="px-4 py-2 border rounded bg-gray-100 text-gray-700">+91</span>
                  <input name="phone" type="tel" maxLength="10" value={form.phone} onChange={handleChange} placeholder="Enter your number" className="input flex-1" required />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button type="button" onClick={() => handleWorkStatus("experienced")} className={`flex-1 py-2 rounded-md border font-medium ${form.workStatus === "experienced" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border-gray-300"}`}>
                  I'm Experienced
                </button>
                <button type="button" onClick={() => handleWorkStatus("fresher")} className={`flex-1 py-2 rounded-md border font-medium ${form.workStatus === "fresher" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border-gray-300"}`}>
                  I'm a Fresher
                </button>
              </div>

              {form.name && form.email && !emailError && isPasswordValid(form.password) && form.phone && form.workStatus && (
                <button type="button" onClick={() => setStep(2)} className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition mt-4">
                  Next
                </button>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Current Location</label>
                <input list="cities" name="city" value={form.city} onChange={handleChange} placeholder="Start typing city..." className="input" />
                <datalist id="cities">
                  {filteredCities.map((c, i) => <option key={i} value={c} />)}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-semibold">Highest Qualification</label>
                <select name="qualification" value={form.qualification} onChange={handleChange} className="input">
                  <option value="">Select qualification</option>
                  {qualificationOptions.map((q, i) => <option key={i}>{q}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold">Specialization</label>
                <select name="specialization" value={form.specialization} onChange={handleChange} className="input">
                  <option value="">Select specialization</option>
                  {specializationOptions.map((s, i) => <option key={i}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold">College</label>
                <input list="colleges" name="college" value={form.college} onChange={handleChange} placeholder="Start typing college..." className="input" />
                <datalist id="colleges">
                  {filteredColleges.map((c, i) => <option key={i} value={c} />)}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-semibold">Skills</label>
                <div className="flex gap-2">
                  <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Type a skill..." className="input flex-1" />
                  <button type="button" onClick={addSkill} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.skills.map((skill, i) => (
                    <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="ml-1 text-red-500">&times;</button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold">Resume (Optional)</label>
                <input type="file" onChange={(e) => setForm(prev => ({ ...prev, resume: e.target.files[0] }))} className="input" />
              </div>
              <button type="submit" disabled={isSubmitting} className={`w-full py-2 rounded text-white mt-4 transition ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}>
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Registering...
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default Register;
