/**
 * Authentication utility functions
 */

export const authUtils = {
    /**
     * Check if user is authenticated by checking localStorage for access token
     */
    isAuthenticated: (): boolean => {
        if (typeof window === 'undefined') return false;
        const token = localStorage.getItem('access_token');
        return !!token;
    },

    /**
     * Get access token from localStorage
     */
    getAccessToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('access_token');
    },

    /**
     * Get refresh token from localStorage
     */
    getRefreshToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('refresh_token');
    },

    /**
     * Clear all auth tokens from localStorage
     */
    clearTokens: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
};