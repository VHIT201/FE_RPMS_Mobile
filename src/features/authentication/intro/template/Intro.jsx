import { StyleSheet, View, Image, Text, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { CommonImage } from '../../../../assets/images';
import { useNavigation } from '@react-navigation/native';

const Intro = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login'); // Replace 'Login' with your actual Login screen name
    }, 3000);

    // Clear the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={CommonImage.LogoDefault} />
    </SafeAreaView>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
});
