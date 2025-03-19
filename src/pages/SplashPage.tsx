/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {color, routes} from '../config/Env';
import {
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Video from 'react-native-video';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function SplashPage() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fade out Splash Screen
      Animated.timing(fadeAnim, {
        toValue: 0, // Fully transparent
        duration: 500, // 1 second fade-out
        useNativeDriver: true,
      }).start(() => {
        navigation.replace(routes.LOGIN);
      });
    }, 3500);

    return () => clearTimeout(timer); // Cleanup function
  }, []);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     addEventListener(async state => {
  //       if ((state as {isConnected: boolean}).isConnected) {
  //         const a: null | string = await getData('token', 'string');
  //         if (a) {
  //           dispatch(TokenLogin({token: a})).then(({payload}) => {
  //             if (!(payload as {success: boolean}).success) {
  //               navigation.navigate(routes.LOGIN);
  //             }
  //           });
  //         } else {
  //           if (Platform.OS === 'android') {
  //             setInterval(() => {
  //               navigation.navigate(routes.SE_HOMEPAGE);
  //             }, 1000);
  //           } else {
  //             setInterval(() => {
  //               navigation.navigate(routes.SE_HOMEPAGE);
  //             }, 3500);
  //           }
  //         }
  //       } else {
  //         const a: null | object = await getData('user', 'object');
  //         if (a) {
  //           dispatch(login({success: true, management: {}}));
  //         } else {
  //           navigation.navigate(routes.LOGIN);
  //         }
  //       }
  //     });
  //   };
  //   checkLogin();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <View style={{flex: 1, backgroundColor: color.white}}>
        <Video
          source={require('../assests/splash.mp4')} // Ensure the path is correct
          style={styles.videoBackground}
          resizeMode="contain"
          muted
        />

      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Change as needed
  },
  videoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default SplashPage;
