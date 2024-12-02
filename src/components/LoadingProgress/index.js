import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import colors from '../../values/colors';

const LoadingProgress = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLoading}>
        <SkypeIndicator color={colors.royal_blue} />
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
    elevation: Platform.OS == 'android' ? 4 : 0,
    backgroundColor: `rgba(0,0,0,0.5)`,
    flex: 1,
  },
  containerLoading: {
    height: 140,
    padding: 30,
    borderRadius: 10,
  },
});
export default LoadingProgress;
