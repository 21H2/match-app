import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { handleError, safeSync } from '../utils/errorHandler';
import SafeView from '../components/SafeView';

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handlePress = useCallback(() => {
    try {
      if (!mounted) return;
      
      const newCount = count + 1;
      setCount(newCount);
      
      safeSync(
        () => {
          Alert.alert(
            'Success! ✨',
            `Bunk app is working perfectly!\n\nButton pressed ${newCount} times 🎉`,
            [{ text: 'Awesome!', style: 'default' }]
          );
        },
        undefined,
        'Alert display'
      );
    } catch (error) {
      handleError(error, 'Button press');
    }
  }, [count, mounted]);

  // Safe rendering with error recovery
  const getAppInfo = () => {
    try {
      return {
        name: Constants.expoConfig?.name || 'Bunk',
        version: Constants.expoConfig?.version || '1.0.0',
        platform: Platform.OS,
      };
    } catch (error) {
      handleError(error, 'Getting app info');
      return {
        name: 'Bunk',
        version: '1.0.0',
        platform: Platform.OS,
      };
    }
  };

  const appInfo = getAppInfo();

  return (
    <SafeView>
      <ScrollView 
        contentContainerStyle={styles.container}
        bounces={true}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar style="auto" />
        
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Bunk!</Text>
          <Text style={styles.subtitle}>Frontend-only mobile app</Text>
          <Text style={styles.platformText}>Running on {appInfo.platform}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>✨</Text>
            <Text style={styles.cardText}>Built with Expo</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>📱</Text>
            <Text style={styles.cardText}>Ready for deployment</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>🎨</Text>
            <Text style={styles.cardText}>Standalone frontend</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>🚀</Text>
            <Text style={styles.cardText}>Version {appInfo.version}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>✅</Text>
            <Text style={styles.cardText}>All systems operational</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Test App ({count})</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>App: {appInfo.name}</Text>
          <Text style={styles.footerText}>Version: {appInfo.version}</Text>
          <Text style={styles.footerText}>Platform: {appInfo.platform}</Text>
        </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EE61A1',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  platformText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textTransform: 'capitalize',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#EE61A1',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginVertical: 2,
  },
});
