/**
 * Global error handlers and polyfills
 * This file sets up global error handling for the app
 */

// Global error handler
const originalErrorHandler = ErrorUtils.getGlobalHandler();

ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
  console.error('=== GLOBAL ERROR ===');
  console.error('Error:', error);
  console.error('Message:', error.message);
  console.error('Stack:', error.stack);
  console.error('Is Fatal:', isFatal);
  console.error('===================');
  
  // Call original handler
  if (originalErrorHandler) {
    originalErrorHandler(error, isFatal);
  }
});

// Handle console errors
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  originalConsoleError('🔴 ERROR:', ...args);
};

const originalConsoleWarn = console.warn;
console.warn = (...args: any[]) => {
  originalConsoleWarn('⚠️ WARNING:', ...args);
};

console.log('🚀 App starting - Global error handlers active');

// Ensure fetch is available
if (typeof global.fetch === 'undefined') {
  console.warn('fetch is not available, some features may not work');
}

export {};
