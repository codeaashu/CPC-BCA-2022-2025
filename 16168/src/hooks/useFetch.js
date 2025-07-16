import { useState, useEffect } from "react";

export const useFetch = (url, options = {}, dependencies = [], pollInterval = null) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(url, options);
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}, ${response.status}`)
            }
            setData(responseData);
            setError()
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }     
    };

    useEffect(() => {
        fetchData();

        // Set up polling if interval is provided
        let intervalId;
        if (pollInterval) {
            intervalId = setInterval(fetchData, pollInterval);
        }

        // Cleanup function
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, dependencies);

    return { data, loading, error, refetch: fetchData }
};