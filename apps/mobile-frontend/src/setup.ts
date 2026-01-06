/**
 * Global error handlers and polyfills
 * This file sets up global error handling for the app
 */

// Global error handler
const originalErrorHandler = ErrorUtils.getGlobalHandler();

ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
  console.error('Global error handler:', error, 'isFatal:', isFatal);
  
  // Call original handler
  if (originalErrorHandler) {
    originalErrorHandler(error, isFatal);
  }
  
  // Additional logging or error reporting can be added here
});

// Handle console errors
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  originalConsoleError(...args);
  // Additional error tracking can be added here
};

// Ensure fetch is available
if (typeof global.fetch === 'undefined') {
  console.warn('fetch is not available, some features may not work');
}

// Log app start
console.log('App initialization - Global error handlers set up');

export {};
