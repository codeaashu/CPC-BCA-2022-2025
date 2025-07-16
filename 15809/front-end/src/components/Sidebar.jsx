import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Clock, 
  ThumbsUp, 
  ListVideo, 
  UserCog,
  LogOut,
  Users,
  Plus
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { fetchUserDetail } from "../Redux/Slices/User";
import { fetchSubscribedChannels } from "../Redux/Slices/Subscription";
import { getRandomColor } from "@/utils/getRandomColor";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { userDetail, isLoading } = useSelector((state) => state.user);
  const { subscribedChannels, subscriptionIsLoading, subscriptionError } = useSelector((state) => state.subscription);
  const [isOpen, setIsOpen] = useState(false);
  const [fallbackColor, setFallbackColor] = useState("");

  // Listen for toggle sidebar events from Navbar component
  useEffect(() => {
    const handleToggleSidebar = () => {
      setIsOpen(prev => !prev);
    };

    document.addEventListener('toggleSidebar', handleToggleSidebar);
    
    // Cleanup
    return () => {
      document.removeEventListener('toggleSidebar', handleToggleSidebar);
    };
  });

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only run this in mobile view
      if (window.innerWidth >= 768) return;
      
      // Check if click is outside sidebar
      if (isOpen && !e.target.closest('#sidebar') && !e.target.closest('[aria-label="Toggle menu"]')) {
        setIsOpen(false);
      }
    };

    // Listen for clicks on the document
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Handle window resize - automatically open sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch user details
  useEffect(() => {
    dispatch(fetchUserDetail());
  }, [dispatch]);

  // Fetch subscribed channels when user detail is available
  useEffect(() => {
    if (userDetail?._id) {
      dispatch(fetchSubscribedChannels(userDetail?._id));
      setFallbackColor(getRandomColor());
      console.log("Fetching subscribed channels...");
    }
  }, [userDetail, dispatch]);

  const menuItems = [
    { icon: <Home size={18} />, text: "Home", to: "/" },
    { icon: <Clock size={18} />, text: "History", to: "/history" },
    { icon: <ThumbsUp size={18} />, text: "Liked Videos", to: "/likedvideos" },
    { icon: <ListVideo size={18} />, text: "Playlists", to: "/playlists" },
  ];

  return (
    <>
      {/* Mobile Overlay - only visible when sidebar is open on mobile */}
      {isOpen && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-200" 
          onClick={() => setIsOpen(false)} 
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        id="sidebar"
        className={`fixed left-0 top-16 bottom-0 z-40 w-64 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:z-0 md:shadow-none border-r border-slate-800/40 overflow-y-auto bg-slate-950 scrollbar-thin scrollbar-thumb-slate-700/30 scrollbar-track-slate-900/30`}
      >
        <div className="py-4 px-2 h-full flex flex-col">
          {/* Navigation Links */}
          <nav className="space-y-0.5 mb-6">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-slate-800/80 text-orange-500 shadow-sm"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }`
                }
                onClick={() => {
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
              >
                <span className="mr-3 text-orange-500/80 group-hover:text-orange-500">{item.icon}</span>
                {item.text}
              </NavLink>
            ))}
          </nav>

          {/* Subscriptions Section */}
          <div className="mt-3 mb-2">
            <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center">
              <Users size={13} className="mr-1.5 text-slate-500/70" /> Subscriptions
            </h3>
            
            <div className="mt-2 space-y-0.5 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700/30 scrollbar-track-transparent pr-1">
              {subscribedChannels && subscribedChannels.length > 0 ? (
                subscribedChannels.map((subscription) => (
                  <NavLink
                    key={subscription?._id}
                    to={`/profile/${subscription?.username}`}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-200 group ${
                        isActive
                          ? "bg-slate-800/80 text-orange-500"
                          : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                      }`
                    }
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <Avatar className="h-6 w-6 mr-3 border border-slate-700 shadow-sm">
                      <AvatarImage src={subscription?.avatar} />
                      <AvatarFallback className="bg-slate-800 text-orange-500 text-xs font-medium">
                        {subscription?.username?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{subscription?.fullName}</span>
                  </NavLink>
                ))
              ) : (
                <div className="px-4 py-4 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 bg-slate-800/50 rounded-full flex items-center justify-center mb-2 text-slate-500">
                    <Users size={16} />
                  </div>
                  <p className="text-xs text-slate-500">
                    No subscriptions yet
                  </p>
                  <button className="mt-2 text-xs flex items-center text-orange-500 hover:text-orange-400 transition-colors">
                    <Plus size={12} className="mr-1" />
                    Discover channels
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Section */}
          {userDetail && (
            <div className="mt-auto border-t border-slate-800/50 pt-4">
              <NavLink
                to="/edit"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-slate-800/80 text-orange-500"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
              >
                <span className="mr-3 text-orange-500/80">
                  <UserCog size={18} />
                </span>
                Edit Profile
              </NavLink>
            </div>
          )}

          {userDetail && (
            <div className="border-t border-slate-800/50 mt-2 pt-2">
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-slate-800/80 text-orange-500"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setIsOpen(false);
                  }
                }}
              >
                <span className="mr-3 text-orange-500/80">
                  <LogOut size={18} />
                </span>
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
