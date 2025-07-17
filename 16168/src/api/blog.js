// Add this new function for search
export const searchBlogs = async (query) => {
    try {
        const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/search?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Search failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}; 