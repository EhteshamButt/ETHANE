/**
 * Centralized API configuration
 * Uses environment variable API_BASE_URL or defaults based on environment
 */

const getApiBase = (): string => {
  // Check for environment variable (set in Vercel or .env)
  // @ts-ignore - process.env is available at build time
  if (typeof process !== 'undefined' && process.env?.API_BASE_URL) {
    // @ts-ignore
    return process.env.API_BASE_URL
  }
  
  // Check if we're in production (Vercel sets NODE_ENV=production)
  // @ts-ignore
  const isProd = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production'
  
  // Also check if we're not on localhost
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1' ||
     window.location.hostname === '')
  
  // Production backend URL (when deployed to Vercel)
  if (isProd || !isLocalhost) {
    return 'https://ethan-ebackend.vercel.app'
  }
  
  // Development: use localhost
  return 'http://127.0.0.1:8080'
}

export const API_BASE = getApiBase()

