import { API_ENDPOINTS } from '../constants';

/**
 * Helper to get the full API URL for an endpoint.
 * @param endpoint The endpoint path (e.g., '/integrations')
 * @returns The full URL
 */
export const getApiUrl = (endpoint: string): string => {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${API_ENDPOINTS.BASE_URL}${cleanEndpoint}`;
};

export default API_ENDPOINTS.BASE_URL;
