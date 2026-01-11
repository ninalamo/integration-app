const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Helper to get the full API URL for an endpoint.
 * @param endpoint The endpoint path (e.g., '/integrations')
 * @returns The full URL
 */
export const getApiUrl = (endpoint: string): string => {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${API_URL}${cleanEndpoint}`;
};

export default API_URL;
