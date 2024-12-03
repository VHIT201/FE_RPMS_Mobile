import React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import colors from '../../values/colors';

const LoadingProgress = ({ message = "Đang tải..." }) => { // Allow passing a custom message
  return (
    <View style={styles.container}>
      <View style={styles.containerLoading}>
        <SkypeIndicator color={colors.royal_blue} />
        <Text style={styles.loadingText}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(0,0,0,0.5)`,  // Semi-transparent overlay
    elevation: Platform.OS === 'android' ? 4 : 0,  // Optional shadow for Android
  },
  containerLoading: {
    height: 180,  // Increase container height for better spacing
    padding: 30,
    borderRadius: 12,  // Slightly rounded corners
    backgroundColor: 'white',  // White background to make the spinner stand out
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20, // Space between spinner and text
    fontSize: 16,
    fontWeight: '600',
    color: colors.light_black,  // Set text color to dark for better visibility
    textAlign: 'center',  // Center the text
  },
});

export default LoadingProgress;
