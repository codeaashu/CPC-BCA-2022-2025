
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DoctorAuthProvider } from "@/contexts/DoctorAuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DoctorAuth from "./pages/DoctorAuth";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorProfilePage from "./pages/DoctorProfile";
import Profile from "./pages/Profile";
import CancerAssessment from "./pages/CancerAssessment";
import Hospitals from "./pages/Hospitals";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Doctor routes - separate auth context */}
          <Route path="/doctor/*" element={
            <DoctorAuthProvider>
              <Routes>
                <Route path="auth" element={<DoctorAuth />} />
                <Route path="dashboard" element={<DoctorDashboard />} />
                <Route path="profile" element={<DoctorProfilePage />} />
              </Routes>
            </DoctorAuthProvider>
          } />
          
          {/* Patient routes - separate auth context */}
          <Route path="/*" element={
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cancer-assessment" element={<CancerAssessment />} />
                <Route path="/hospitals" element={<Hospitals />} />
                <Route path="/government-schemes" element={<GovernmentSchemes />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
