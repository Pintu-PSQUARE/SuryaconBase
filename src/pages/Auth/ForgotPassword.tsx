/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthWarper from './AuthWarper';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {color, font, routes} from '../../config/Env';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {useAppDispatch} from '../../store/hooks';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ForgotPasswordOtp} from '../../reducers/UserSlice';

export default function ForgotPassword() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [credential, setCredential] = useState<string>('');
  const [active, setActive] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error]);
  return (
    <>
      <AuthWarper>
        <Text style={style.topText}>Recover Password</Text>
        <Text style={style.subText}>
          To reset your password, please enter your registered mobile number or
          email ID to receive a One-Time Password (OTP)
        </Text>

        <View style={{marginTop: responsiveScreenHeight(3)}}>
          <Text style={style.errorText}>{error}</Text>
          <View style={{flexDirection: 'row', gap: responsiveScreenWidth(3)}}>
            <View style={style.leftIcon}>
              <FontAwesome name="user-o" style={style.icon} />
            </View>
            <TextInput
              style={[
                style.input,
                {
                  borderWidth: 1,
                  borderColor: error ? color.red : color.primary,
                },
              ]}
              keyboardType="default"
              returnKeyType="done"
              placeholder="Mobile No. or Email ID"
              placeholderTextColor={color.black28}
              onChangeText={e => {
                if (!e) {
                  setCredential('');
                  return;
                }
                const firstChar: any = e.charAt(0);
                if (!isNaN(firstChar) && firstChar !== ' ') {
                  if (e.length === 10) setActive(true);
                  if (e.length !== 10) setActive(false);
                  const regex = /^\d+$/;
                  if (!regex.test(e)) return;
                  setCredential(e);
                  return;
                } else if (e) {
                  const regex = /@gmail\.com$/;
                  if (regex.test(e)) setActive(true);
                  if (!regex.test(e)) setActive(false);
                  setCredential(e);
                  return;
                }
              }}
            />
            <View
              style={{
                width: responsiveScreenWidth(13),
                backgroundColor: color.primary,
              }}></View>
          </View>
        </View>

        <View style={{flex: 1}}></View>

        <View style={style.btn}>
          <Text
            onPress={() => {
              if (!credential) {
                setError('Mobile No. or Email ID is required');
                return;
              }
              const firstChar: any = credential.charAt(0);
              if (!isNaN(firstChar)) {
                if (credential.length !== 10) {
                  setError('Invalid Mobile No.');
                  return;
                }
              } else if (isNaN(firstChar)) {
                const regex = /@gmail\.com$/;
                if (!regex.test(credential)) {
                  setError('Invalid email ID');
                  return;
                }
              }
              dispatch(ForgotPasswordOtp({credential})).then(e => {
                if (!e.payload.success) {
                  setError(e.payload.message);
                } else {
                  navigation.navigate(routes.OTP, {credential, page: 'reset'});
                }
              });
            }}
            style={{
              fontSize: responsiveScreenFontSize(2.2),
              color: active ? color.primary : color.primary2,
              fontWeight: '500',
            }}>
            Continue
          </Text>
        </View>
      </AuthWarper>
    </>
  );
}

export const style = StyleSheet.create({
  topText: {
    marginHorizontal: responsiveScreenWidth(6),
    fontSize: responsiveScreenFontSize(3),
    fontFamily: font.NunitoBold,
    color: color.white,
    textAlign: 'center',
  },
  subText: {
    marginHorizontal: responsiveScreenWidth(6),
    fontFamily: font.NunitoRegular,
    fontSize: responsiveScreenFontSize(1.9),
    lineHeight: responsiveScreenHeight(2.4),
    paddingTop: responsiveScreenHeight(1.5),
    color: color.white,
    textAlign: 'center',
  },
  errorText: {
    fontFamily: font.NunitoRegular,
    marginVertical: responsiveScreenHeight(0.5),
    color: color.white,
    fontSize: responsiveScreenFontSize(1.4),
    alignSelf: 'center',
    width: responsiveScreenWidth(65),
  },
  leftIcon: {
    width: responsiveScreenWidth(13),
    backgroundColor: color.white,
    borderTopRightRadius: 200,
    borderBottomRightRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: responsiveScreenFontSize(3),
    color: color.black87,
    paddingRight: responsiveScreenWidth(2),
  },
  input: {
    backgroundColor: color.white,
    fontWeight: '400',
    borderRadius: 200,
    paddingHorizontal: responsiveScreenWidth(5),
    paddingVertical: responsiveScreenHeight(1.5),
    fontSize: responsiveScreenFontSize(1.8),
    fontFamily: font.NunitoMedium,
    borderColor: color.primary,
    borderWidth: 1,
    flex: 1,
    color: color.black87,
  },
  btn: {
    backgroundColor: color.white,
    borderRadius: 200,
    width: responsiveScreenWidth(80),
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: responsiveScreenHeight(1.6),
    marginTop: responsiveScreenHeight(2.5),
  },
});
