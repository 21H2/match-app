import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, AppState, AppStateStatus } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingScreen from '../components/LoadingScreen';
import { handleError, safeAsync } from '../utils/errorHandler';

// Prevent splash screen from auto-hiding
try {
  console.log('🎬 Setting up splash screen...');
  SplashScreen.preventAutoHideAsync().catch((error) => {
    console.warn('⚠️ SplashScreen.preventAutoHideAsync error:', error);
  });
} catch (error) {
  console.warn('⚠️ SplashScreen setup error:', error);
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [initError, setInitError] = useState<Error | null>(null);

  console.log('🎯 RootLayout rendering...');

  // Handle app state changes
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  // Initialize app with comprehensive error handling
  useEffect(() => {
    async function prepare() {
      try {
        console.log('⏳ Starting app initialization...');
        
        // Wait for initial setup
        await safeAsync(
          () => new Promise(resolve => setTimeout(resolve, 200)),
          undefined,
          'Initial setup delay'
        );

        console.log('✅ Initial setup complete');
        
        // Simulate initialization
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('✅ App initialization complete');
        
      } catch (e) {
        console.error('❌ App initialization error:', e);
        handleError(e, 'App initialization');
        setInitError(e as Error);
      } finally {
        setAppIsReady(true);
        console.log('✅ App is ready');
        
        // Hide splash screen
        try {
          await SplashScreen.hideAsync();
          console.log('✅ Splash screen hidden');
        } catch (error) {
          console.warn('⚠️ SplashScreen.hideAsync error:', error);
        }
      }
    }

    prepare();
  }, []);

  // Show loading screen while app is not ready
  if (!appIsReady) {
    console.log('⏳ Showing loading screen...');
    return <LoadingScreen message="Initializing Bunk..." />;
  }

  // Show error if initialization failed but allow app to continue
  if (initError) {
    console.warn('⚠️ App initialized with errors:', initError);
  }

  console.log('✅ Rendering main app...');

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#EE61A1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            animation: 'fade',
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Bunk',
            }}
          />
        </Stack>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
