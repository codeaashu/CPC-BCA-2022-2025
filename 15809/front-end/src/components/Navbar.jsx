import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "../assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Menu, Plus, Search, X, Upload, Video } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetail } from "@/Redux";
import { useEffect, useState, useRef } from "react";
import { getRandomColor } from "@/utils/getRandomColor";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [fallbackColor, setFallbackColor] = useState("");
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetail, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserDetail());
    setFallbackColor(getRandomColor());
  }, [dispatch]);
  
  // Focus search input when mobile search is opened
  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showMobileSearch]);
  

  const handleToggleSidebar = () => {
    // Use a custom event to communicate with the Sidebar component
    const event = new CustomEvent('toggleSidebar');
    document.dispatchEvent(event);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/videos?query=${encodeURIComponent(searchTerm.trim())}`);
      setShowMobileSearch(false);
    }
  };

  // Handle mobile search toggle
  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 backdrop-blur-xl bg-slate-950/60 border-b border-slate-800/50 z-50 flex items-center justify-between px-3 md:px-4 shadow-md">
      {/* Left Section: Logo and sidebar toggle */}
      <div className="flex items-center">
        {/* Mobile menu toggle button */}
        <button 
          className="mr-3 p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors sm:mr-4
          md:hidden
          " 
          onClick={handleToggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo - hidden when mobile search is active */}
        <Link to="/" className={`flex items-center ${showMobileSearch ? 'hidden sm:flex' : ''}`}>
          <img src={logo} alt="Pin Tube Logo" className="h-7 md:h-8 w-auto" />
        </Link>
      </div>

      {/* Center Section: Search (responsive) */}
      <div className={`flex-1 max-w-xl mx-2 md:mx-4 ${showMobileSearch ? 'flex' : 'hidden sm:flex'}`}>
        <form onSubmit={handleSearch} className="relative w-full">
          <div className="relative flex items-center w-full">
            <input
              ref={searchInputRef}
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search videos..."
              className="w-full h-10 pl-4 pr-12 rounded-full bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/40 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-orange-500 transition-colors"
              disabled={!searchTerm.trim()}
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Right Section: Actions and Profile (conditionally rendered) */}
      <div className="flex items-center space-x-1 md:space-x-2">
        {/* Mobile search toggle button - visible only on mobile when search is not active */}
        <button
          className={`p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors sm:hidden ${showMobileSearch ? 'hidden' : ''}`}
          onClick={toggleMobileSearch}
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        
        {/* Close search button - only on mobile when search is active */}
        {showMobileSearch && (
          <button
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors sm:hidden"
            onClick={toggleMobileSearch}
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Create button - hidden on mobile when search is active */}
        <Link 
          to="/publish-video"
          className={`${showMobileSearch ? 'hidden sm:flex' : ''}`}
        >
          <Button 
            variant="ghost" 
            size="sm"
            className="rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border-none space-x-1.5"
          >
            <Video className="h-4 w-4 text-orange-500" /> 
            <span className="hidden md:inline">Create</span>
          </Button>
        </Link>

        {/* Notifications - hidden on mobile when search is active */}
        {/* <Button 
          variant="ghost" 
          size="icon" 
          className={`p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors ${showMobileSearch ? 'hidden sm:flex' : ''}`}
        >
          <div className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </div>
        </Button> */}

        {/* Profile - hidden on mobile when search is active */}
        <div className={`${showMobileSearch ? 'hidden sm:block' : ''}`}>
          {userDetail ? (
            <Link to="/profile" className="relative group">
              <Avatar className="h-8 w-8 ring-2 ring-slate-800 hover:ring-orange-600/30 transition-all duration-300">
                <AvatarImage src={userDetail?.avatar} alt={userDetail?.fullName} />
                <AvatarFallback className={`${fallbackColor} text-white`}>
                  {userDetail?.fullName?.[0]?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              
            </Link>
          ) : (
            <Link to="/login">
              <Button 
                size="sm" 
                className="rounded-lg bg-orange-600 hover:bg-orange-500 text-white border-none font-medium"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
