/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes} from './src/config/Env';
import {} from 'react-native';
import {
  ForgotPassword,
  LoginPage,
  LoginWithNumber,
  NewPassword,
  OptVerification,
  SplashPage,
} from './src/pages';
// import {useAppSelector} from './src/store/hooks';
import {SafeAreaView} from 'react-native-safe-area-context';
import useHapticFeedback from './src/hooks/useHapticFeedback';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  // const {isLogin, user} = useAppSelector(state => state.userStore);
  const {triggerHaptic} = useHapticFeedback();
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'transparent'}}
      edges={['left', 'right']}>
      <NavigationContainer onStateChange={() => triggerHaptic('impactMedium')}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // Hide header for a clean UI
            animation: 'slide_from_right', // Apply fade animation on navigation
          }}>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.SPLASH}
                component={SplashPage}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.LOGIN}
                component={LoginPage}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.FORGOTPASSWORD}
                component={ForgotPassword}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.OTP}
                component={OptVerification}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.NEWPASSWORD}
                component={NewPassword}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name={routes.LOGINWITHNUMBER}
                component={LoginWithNumber}
              />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;