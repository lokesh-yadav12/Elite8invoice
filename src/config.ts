// App configuration
export const APP_CONFIG = {
  // App info
  APP_NAME: 'DPS Bangalore',
  APP_DESCRIPTION: 'Delhi Public School Bangalore - Nurturing young minds with excellence in education',
  
  // API configuration
  API_BASE_URL: process.env.REACT_APP_API_URL || '/api',
  
  // Feature flags
  FEATURES: {
    ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    MAINTENANCE_MODE: process.env.REACT_APP_MAINTENANCE_MODE === 'true',
  },
  
  // Social media links
  SOCIAL_MEDIA: {
    FACEBOOK: 'https://facebook.com/dpsbangalore',
    TWITTER: 'https://twitter.com/dpsbangalore',
    INSTAGRAM: 'https://instagram.com/dpsbangalore',
    YOUTUBE: 'https://youtube.com/dpsbangalore',
    LINKEDIN: 'https://linkedin.com/school/dpsbangalore',
  },
  
  // Contact information
  CONTACT: {
    EMAIL: 'info@dpsbangalore.edu.in',
    PHONE: '+91 80 1234 5678',
    ADDRESS: '123 School Street, Bangalore, Karnataka, India',
  },
  
  // School information
  SCHOOL: {
    ESTABLISHED: 2000,
    AFFILIATION: 'CBSE',
    PRINCIPAL: 'Dr. Ramesh Kumar',
    CAPACITY: 2500,
    FACULTY_COUNT: 150,
  },
  
  // Academic session
  ACADEMIC_YEAR: '2026-27',
  
  // Important dates
  IMPORTANT_DATES: {
    ADMISSIONS_OPEN: 'January 1, 2026',
    ADMISSIONS_CLOSE: 'March 31, 2026',
    ACADEMIC_YEAR_START: 'April 1, 2026',
    ACADEMIC_YEAR_END: 'March 31, 2027',
  },
  
  // Default pagination settings
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
} as const;

// Export types
export type AppConfig = typeof APP_CONFIG;
