/**
 * Global error handler utility
 */

export const handleError = (error: unknown, context?: string): void => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;
  
  console.error(`[${context || 'Error'}]:`, errorMessage);
  if (errorStack && __DEV__) {
    console.error('Stack:', errorStack);
  }
};

export const safeAsync = async <T>(
  fn: () => Promise<T>,
  fallback?: T,
  context?: string
): Promise<T | undefined> => {
  try {
    return await fn();
  } catch (error) {
    handleError(error, context);
    return fallback;
  }
};

export const safeSync = <T>(
  fn: () => T,
  fallback?: T,
  context?: string
): T | undefined => {
  try {
    return fn();
  } catch (error) {
    handleError(error, context);
    return fallback;
  }
};

export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number,
  fallback: T
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => 
      setTimeout(() => resolve(fallback), timeoutMs)
    ),
  ]);
};
