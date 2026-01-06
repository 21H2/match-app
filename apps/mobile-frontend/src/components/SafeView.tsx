import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeViewProps {
  children: ReactNode;
  style?: ViewStyle;
  useSafeArea?: boolean;
}

export default function SafeView({ children, style, useSafeArea = true }: SafeViewProps) {
  try {
    if (useSafeArea) {
      return (
        <SafeAreaView style={[styles.container, style]}>
          {children}
        </SafeAreaView>
      );
    }

    return (
      <View style={[styles.container, style]}>
        {children}
      </View>
    );
  } catch (error) {
    console.error('SafeView error:', error);
    return (
      <View style={[styles.container, style]}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
