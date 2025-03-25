/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import {routes} from './src/config/Env';
import {
  DownloadResource,
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
import {useAppSelector,useAppDispatch} from './src/store/hooks';
import { restoreSession } from './src/reducers/UserSlice';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {isLogin, user} = useAppSelector(state => state.userStore);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        // Try to restore session when app starts
        await dispatch(restoreSession());
      } catch (error) {
        console.log('No active session found');
      } finally {
        setInitializing(false);
      }
    };

    loadSession();
  }, [dispatch]);
  const {triggerHaptic} = useHapticFeedback();

  if (initializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'transparent'}}
      edges={['left', 'right']}>
      <NavigationContainer onStateChange={() => triggerHaptic('impactMedium')}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          {!isLogin ? (
            <>
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
            </>
          ) : (
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={routes.DOWNLOAD_RESOURCE}
              component={DownloadResource}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
