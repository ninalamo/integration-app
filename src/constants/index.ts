export const APP_COLORS = {
    PRIMARY: '#66bb00',
    PRIMARY_HOVER: '#559900',
    SECONDARY: '#1a202c',
    ERROR: '#ef4444',
    ERROR_HOVER: '#dc2626',
};

export const API_ENDPOINTS = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
    CONNECTORS: '/connectors',
    CONNECTIONS: '/connections',
};

export const SOURCE_TYPES = {
    CARBON: 'Carbon',
};

export const SORT_DIRECTION = {
    ASC: 'asc',
    DESC: 'desc',
} as const;

export const DELAY_MS = {
    SERVICES: 1500,
    CONNECTIONS: 3000,
};
