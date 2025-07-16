import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, RefreshCcw, Activity, Server } from "lucide-react";
import { healthCheck } from "@/axios";

function HealthCheck() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchHealthData = async () => {
    setLoading(true);
    try {
      const response = await healthCheck();
      console.log(response)
      if (response && response.statusCode === 200) {
        setHealthData(response);
        setLastUpdated(new Date());
        setError(null);
      } else {
        setError("Received invalid response");
      }
    } catch (error) {
      console.error("Error fetching health status:", error);
      setError(error.message || "Failed to fetch health status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
   // Set up polling for periodic health checks
    const interval = setInterval(fetchHealthData, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Activity className="h-7 w-7" /> 
            System Health Status
          </h1>
          <button 
            onClick={fetchHealthData} 
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-md transition"
            disabled={loading}
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900/50 dark:text-red-200">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {loading && !error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600 dark:text-slate-300">Checking system health...</p>
          </div>
        ) : (
          <>
            {healthData && (
              <div className={`mb-8 rounded-lg overflow-hidden shadow-md ${
                healthData.success ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"
              }`}>
                <div className="p-6 flex items-center">
                  {healthData.success ? (
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  ) : (
                    <XCircle className="h-10 w-10 text-red-500" />
                  )}
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                      {healthData.success ? "All Systems Operational" : "System Issues Detected"}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      {healthData.message || "No additional information available"}
                    </p>
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Status Code: {healthData.statusCode}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* System Status Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                  <Server className="h-5 w-5" /> Server Status
                </h3>
                <div className="flex items-center mb-3">
                  <div className={`h-3 w-3 rounded-full ${
                    healthData?.success ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                  <span className="ml-2 text-slate-700 dark:text-slate-200">
                    {healthData?.success ? "Online" : "Offline"}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex justify-between py-1">
                      <span>Response Time:</span>
                      <span className="font-medium">Fast</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Status:</span>
                      <span className="font-medium">{healthData?.message || "Unknown"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Status Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                  <Activity className="h-5 w-5" /> API Health
                </h3>
                <div className="flex items-center mb-3">
                  <div className={`h-3 w-3 rounded-full ${
                    healthData?.success ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                  <span className="ml-2 text-slate-700 dark:text-slate-200">
                    {healthData?.success ? "Operational" : "Degraded"}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex justify-between py-1">
                      <span>Status Code:</span>
                      <span className="font-medium">{healthData?.statusCode || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Uptime Card */}
            <div className="mt-6 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium mb-4 text-slate-800 dark:text-white">Service Status</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                  <thead className="bg-slate-50 dark:bg-slate-700/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Service</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">API</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex items-center rounded-full text-xs font-medium ${
                          healthData?.success 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {healthData?.success ? "Healthy" : "Unhealthy"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">Database</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex items-center rounded-full text-xs font-medium ${
                          healthData?.success 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {healthData?.success ? "Connected" : "Disconnected"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">Authentication</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex items-center rounded-full text-xs font-medium ${
                          healthData?.success 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {healthData?.success ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">Storage</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex items-center rounded-full text-xs font-medium ${
                          healthData?.success 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {healthData?.success ? "Available" : "Unavailable"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {lastUpdated && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-6 text-center">
                Last updated: {lastUpdated.toLocaleTimeString()} on {lastUpdated.toLocaleDateString()}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HealthCheck;