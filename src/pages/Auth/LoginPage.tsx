/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {color, font, routes} from '../../config/Env';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AuthWarper from './AuthWarper';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import DraggableComponent from '../../component/DraggableComponent';
import {SvgXml} from 'react-native-svg';
import {loginArrow, logoSvg} from '../../svg';
import {useAppDispatch} from '../../store/hooks';
import {LoginById} from '../../reducers/UserSlice';
import {style} from './ForgotPassword';
function LoginPage() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [user, setUser] = useState({employeeId: '', password: ''});
  const [error, setError] = useState({employee: '', password: ''});
  const [active, setActive] = useState(false);
  const [slide, setSlide] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user.employeeId && user.password.length === 8) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [user]);
  useEffect(() => {
    if (active && slide) {
      dispatch(LoginById({...user})).then(e => {
        setSlide(false);
        if (!e.payload.success) {
          if (e.payload.message.includes('yee')) {
            setError({...error, employee: e.payload.message});
          } else {
            setError({...error, password: e.payload.message});
          }
        }
      });
    } else {
      setSlide(false);
      if (!user.employeeId && !user.password && !isFirst) {
        setError({
          password: 'Password is required',
          employee: 'Employee ID is required',
        });
      } else if (!user.employeeId && !isFirst) {
        setError({...error, employee: 'Employee ID is required'});
      } else if (!user.password && !isFirst) {
        setError({...error, password: 'Password is required'});
      }
      setIsFirst(false);
    }
    setTimeout(() => {
      setError({employee: '', password: ''});
    }, 3000);
  }, [slide]);
  return (
    <AuthWarper>
      <Text style={style.topText}>Building Trust!</Text>
      <Text style={style.subText}>
        Take control of your projects and lead your team from anywhere
      </Text>
      <View style={{marginTop: responsiveScreenHeight(3)}}>
        <Text style={style.errorText}>{error.employee}</Text>
        <View style={{flexDirection: 'row', gap: responsiveScreenWidth(3)}}>
          <View style={style.leftIcon}>
            <FontAwesome name="user-o" style={style.icon} />
          </View>
          <TextInput
            style={[
              style.input,
              {
                borderWidth: 1,
                borderColor: error.employee ? color.red : color.primary,
              },
            ]}
            keyboardType="default"
            maxLength={10}
            returnKeyType="done"
            placeholder="Employee ID"
            value={user.employeeId}
            placeholderTextColor={color.black28}
            onChangeText={e => {
              setUser({...user, employeeId: e});
            }}
          />
          <View
            style={{
              width: responsiveScreenWidth(13),
              backgroundColor: color.primary,
            }}></View>
        </View>
        <Text style={style.errorText}>{error.password}</Text>
        <View style={{flexDirection: 'row', gap: responsiveScreenWidth(3)}}>
          {!isShow ? (
            <Pressable
              onPress={() => setIsShow(!isShow)}
              style={style.leftIcon}>
              <View style={{height: responsiveScreenHeight(2.5)}}>
                <Image
                  source={require(`../../assests/icons/eye-slash.png`)}
                  style={{
                    height: '120%',
                    aspectRatio: 1,
                    tintColor: color.black87,
                  }}
                />
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => setIsShow(!isShow)}
              style={[style.leftIcon, {}]}>
              <View style={{height: responsiveScreenHeight(2.5)}}>
                <Image
                  source={require(`../../assests/icons/eye.png`)}
                  style={{
                    height: '120%',
                    aspectRatio: 1,
                    tintColor: color.black87,
                  }}
                />
              </View>
            </Pressable>
          )}

          <TextInput
            style={[
              style.input,
              {
                borderWidth: 1,
                borderColor: error.password ? color.red : color.primary,
              },
            ]}
            keyboardType="default"
            maxLength={10}
            returnKeyType="done"
            secureTextEntry={!isShow}
            placeholder="Password"
            placeholderTextColor={color.black28}
            value={user.password}
            onChangeText={e => {
              setUser({...user, password: e});
            }}
          />
          <View
            style={{
              width: responsiveScreenWidth(13),
              backgroundColor: color.primary,
            }}></View>
        </View>
      </View>

      <View
        style={{
          width: responsiveScreenWidth(60),
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          onPress={() => navigation.navigate(routes.FORGOTPASSWORD)}
          style={page.route}>
          Forgot Password?
        </Text>
        <Text
          onPress={() => navigation.navigate(routes.LOGINWITHNUMBER)}
          style={{...page.route, color: color.secondary}}>
          Sign in with OTP
        </Text>
      </View>
      <View style={{flex: 1}}></View>
      <DraggableComponent
        onRight={() => {
          setSlide(true);
        }}
        active={slide}
        right={
          <View style={{height: responsiveScreenHeight(4), aspectRatio: 1}}>
            <SvgXml height={'100%'} xml={loginArrow} />
          </View>
        }
        mid={
          <Text
            style={{
              fontFamily: font.NunitoRegular,
              color: active ? color.primary : color.primary2,
              fontWeight: '500',
              fontSize: 18,
            }}>
            Slide to log in
          </Text>
        }
        height={responsiveScreenHeight(6.5)}
        width={responsiveScreenWidth(80)}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: active ? color.primary : color.primary2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SvgXml height={'100%'} xml={logoSvg} />
        </View>
      </DraggableComponent>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: 'auto',
          width: responsiveScreenWidth(85),
          marginTop: responsiveScreenHeight(1),
        }}>
        <Text
          style={{
            color: color.white,
            fontSize: responsiveScreenFontSize(1.6),
            textAlign: 'center',
          }}>
          By logging in, you agree to our{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            Terms & Conditions.
          </Text>{' '}
          Learn how we process your data in our{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            {' '}
            Privacy Policy.
          </Text>
        </Text>
      </View>
    </AuthWarper>
  );
}
export const page = StyleSheet.create({
  route: {
    fontFamily: font.NunitoRegular,
    fontSize: responsiveScreenFontSize(1.4),
    lineHeight: responsiveScreenHeight(2),
    paddingVertical: responsiveScreenHeight(1),
    color: color.white,
    textAlign: 'center',
  },
});
export default LoginPage;
