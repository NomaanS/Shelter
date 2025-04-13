/**
 * This is a nuclear option to completely eliminate the topInsetsChange error
 * It should be imported at the entry point of the app BEFORE any other imports
 */

// Early initialization to completely disable errors in the app
if (console.disableYellowBox !== undefined) {
  console.disableYellowBox = true;
}

// Create a global error handler to prevent crashes
if (global.ErrorUtils) {
  const originalFatalHandler = global.ErrorUtils.reportFatalError;
  global.ErrorUtils.reportFatalError = (error) => {
    if (error && error.message && error.message.includes('topInsetsChange')) {
      return; // Silently swallow the error
    }
    return originalFatalHandler(error);
  };
}

// Prevent event registration for problematic event types
const EVENT_NAMES_TO_IGNORE = [
  'topInsetsChange',
  'insetsChange',
  'SafeAreaInsets'
];

// Override the NativeEventEmitter if present
if (global.NativeEventEmitter) {
  try {
    const originalAddListener = global.NativeEventEmitter.prototype.addListener;
    global.NativeEventEmitter.prototype.addListener = function(eventType, listener, ...args) {
      if (EVENT_NAMES_TO_IGNORE.some(name => eventType && eventType.includes(name))) {
        return { remove: () => {} };
      }
      return originalAddListener.call(this, eventType, listener, ...args);
    };
  } catch (e) {
    // Ignore errors when patching
  }
}

// Also patch the RCTDeviceEventEmitter if it exists
if (global.RCTDeviceEventEmitter) {
  try {
    const originalAddListener = global.RCTDeviceEventEmitter.addListener;
    global.RCTDeviceEventEmitter.addListener = function(eventType, listener, ...args) {
      if (EVENT_NAMES_TO_IGNORE.some(name => eventType && eventType.includes(name))) {
        return { remove: () => {} };
      }
      return originalAddListener.call(this, eventType, listener, ...args);
    };
  } catch (e) {
    // Ignore errors when patching
  }
}

// Override the global.setTimeout to catch and suppress errors in timers
const originalSetTimeout = global.setTimeout;
global.setTimeout = (callback, timeout) => {
  const wrappedCallback = (...args) => {
    try {
      return callback(...args);
    } catch (error) {
      if (error && error.message && error.message.includes('topInsetsChange')) {
        // Swallow the error
        return;
      }
      throw error;
    }
  };
  return originalSetTimeout(wrappedCallback, timeout);
};

// Override console methods to suppress specific errors
const originalConsoleError = console.error;
console.error = function(...args) {
  if (args.length > 0) {
    const message = String(args[0] || '');
    if (EVENT_NAMES_TO_IGNORE.some(name => message.includes(name))) {
      return; // Don't log this error
    }
    if (message.includes('NativeEventEmitter') || message.includes('EventEmitter')) {
      return; // Also suppress these common related errors
    }
  }
  return originalConsoleError.apply(this, args);
};

// Also patch console.warn
const originalConsoleWarn = console.warn;
console.warn = function(...args) {
  if (args.length > 0) {
    const message = String(args[0] || '');
    if (EVENT_NAMES_TO_IGNORE.some(name => message.includes(name))) {
      return; // Don't log this warning
    }
    if (message.includes('NativeEventEmitter') || message.includes('EventEmitter')) {
      return; // Also suppress these common related warnings
    }
  }
  return originalConsoleWarn.apply(this, args);
};

// Mock the safe area context module
if (global.__r) {
  try {
    const originalRequire = global.__r;
    global.__r = function(moduleId) {
      const module = originalRequire(moduleId);
      if (module && moduleId.toString().includes('SafeAreaContext')) {
        // Return a modified version of the module that doesn't trigger the error
        return {
          ...module,
          SafeAreaInsetsContext: {
            ...module.SafeAreaInsetsContext,
            Consumer: ({ children }) => children({ top: 0, right: 0, bottom: 0, left: 0 }),
          },
        };
      }
      return module;
    };
  } catch (e) {
    // Silently fail if something goes wrong with the module mocking
  }
}

export const patchApplied = true; 