/**
 * analytics.ts (config)
 * Configuration for Google Analytics integration.
 *
 * Replace GA_MEASUREMENT_ID with your actual GA4 Measurement ID (format: G-XXXXXXXX).
 * For local/dev testing you can leave a placeholder but events will not be sent.
 */

export const GA_MEASUREMENT_ID = 'G-XXXXXXX' // TODO: replace with your GA4 measurement id
export const ENABLE_GA = GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXX'