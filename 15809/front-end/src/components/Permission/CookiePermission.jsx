import React, { useState, useEffect } from 'react';

const CookiePermission = () => {
  const [cookiesBlocked, setCookiesBlocked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    
    checkAndSetupCookies();
    
    const delayedCheck = setTimeout(checkAndSetupCookies, 1000);
    
    const intervalCheck = setInterval(checkAndSetupCookies, 30000);
    
    return () => {
      clearTimeout(delayedCheck);
      clearInterval(intervalCheck);
    };
  }, []);

  const checkAndSetupCookies = () => {
    const testValue = `test-${new Date().getTime()}`;
    let cookiesEnabled = false;

    try {
      // Test 1: Try setting a first-party cookie
      document.cookie = `firstPartyTest=${testValue}; path=/`;
      
      // Test 2: Try setting a third-party cookie
      document.cookie = `thirdPartyTest=${testValue}; path=/; SameSite=None; Secure`;
      
      // Test 3: Try setting an essential cookie
      document.cookie = `essentialTest=${testValue}; path=/; SameSite=Lax`;

      // Check if ANY of the test cookies were set successfully
      cookiesEnabled = document.cookie.split(';').some(cookie => 
        cookie.trim().includes(testValue)
      );

      // If no cookies were set, they're blocked
      if (!cookiesEnabled) {
        setCookiesBlocked(true);
        setShowToast(true);
      } else {
        // If cookies are now enabled but were previously blocked, update state
        if (cookiesBlocked) {
          setCookiesBlocked(false);
          setShowToast(false);
        }
      }
    } catch (e) {
      console.error('Cookie test error:', e);
      setCookiesBlocked(true);
      setShowToast(true);
    }

    // Clean up test cookies
    try {
      document.cookie = "firstPartyTest=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "thirdPartyTest=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;";
      document.cookie = "essentialTest=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;";
    } catch (e) {
      // Ignore cleanup errors
    }
  };

  // Only render if we need to show the toast
  if (!showToast) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-sm w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 animate-slide-down z-50">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-800 dark:text-gray-200">
            {cookiesBlocked ? 
              "Cookies are currently blocked. Some features may not work properly. Please check your browser settings." :
              "We've automatically configured cookies for the best experience."}
          </p>
        </div>
        <button 
          onClick={() => setShowToast(false)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CookiePermission;
