import React, { useEffect, useState } from 'react';
import { getEnv } from '@/helpers/getEnv';
import { useParams } from 'react-router-dom';

const TestBlog = () => {
    const { categorySlug } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const encodedSlug = encodeURIComponent(categorySlug);
                const apiUrl = `${getEnv('VITE_API_BASE_URL')}/blog/category/${encodedSlug}`;
                
                console.log('Testing API URL:', apiUrl);
                
                const response = await fetch(apiUrl, {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Response Status:', response.status);
                console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const contentType = response.headers.get('content-type');
                console.log('Content-Type:', contentType);

                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    console.log('Non-JSON Response:', text);
                    throw new Error(`Expected JSON but got ${contentType}`);
                }

                const result = await response.json();
                console.log('API Response:', result);
                setData(result);
            } catch (err) {
                console.error('API Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (categorySlug) {
            fetchData();
        }
    }, [categorySlug]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">API Test Results for Category: {categorySlug}</h2>
            {loading && <div className="text-blue-500 mb-4">Loading...</div>}
            {error && (
                <div className="text-red-500 mb-4">
                    <p>Error: {error}</p>
                    <p>API URL: {getEnv('VITE_API_BASE_URL')}/blog/category/{encodeURIComponent(categorySlug)}</p>
                </div>
            )}
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

export default TestBlog; 