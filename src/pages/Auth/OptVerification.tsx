import { Text, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthWarper from './AuthWarper'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { color, routes } from '../../config/Env'
import { OtpInput } from '../../component'
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { useAppDispatch } from '../../store/hooks'
import { ForgotOtpVerification, LoginOtpVerify } from '../../reducers/UserSlice'
import { style } from './ForgotPassword'

const OptVerification = () => {
    const [otp, setOtp] = useState<Array<string>>(Array(5).fill(''));
    const route: any = useRoute();
    const credential = route?.params?.credential || false;
    const page = route?.params?.page || false;
    const dispatch = useAppDispatch()
    const [error, setError] = useState("")

    const handleOtpChange = (newOtp: Array<string>) => {
        setOtp(newOtp);
    };
    useEffect(()=>{
        setTimeout(() => {
            setError("")
        }, 3000);
    }, [error])
    const navigation: NavigationProp<ParamListBase> = useNavigation()
    return (
        <AuthWarper>
            <Text style={style.topText}>Verification</Text>
            <Text style={style.subText}>We’ve sent a One-Time Password (OTP) to your registered {!isNaN(credential.charAt(0))?" number ending in":"email address "} </Text>
            <Text style={style.subText}>{credential} {page ==="login"? "Enter the OTP below to Sign in.":"Enter the OTP below to reset your password."}</Text>
            <Text style={style.errorText}>{error}</Text>
            <OtpInput
                length={5}
                value={otp}
                disabled={false}
                error = {error}
                onChange={handleOtpChange}
            />
            <View style={{ width: responsiveScreenWidth(85), flexDirection: "row", gap: responsiveScreenWidth(1), alignSelf: "center", marginTop: responsiveScreenHeight(1.5) }}>
                <Text style={{ color: color.white87, fontSize: responsiveScreenFontSize(1.5) }}>Haven’t received an OTP?</Text><Text style={{ color: color.secondary, fontWeight: "500", fontSize: responsiveScreenFontSize(1.5) }}>Resend</Text>
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={style.btn}>
                <Text onPress={() => {
                    const combinedString = otp.join('');
                    if (page === "login") {
                        dispatch(LoginOtpVerify({ credential, otp: combinedString })).then((e)=>{
                            if(!e.payload.success){
                                setError(e.payload.message)
                            }
                            else{
                                console.error("set login value")
                            }
                        })
                    }
                    else {
                        dispatch(ForgotOtpVerification({ credential, otp: combinedString })).then((e)=>{
                            if(!e.payload.success){
                                setError(e.payload.message)
                            }
                            else{
                                navigation.navigate(routes.NEWPASSWORD, {token:e.payload.token })
                            }
                        })
                    }
                }} style={{ fontSize: responsiveScreenFontSize(2.2), color: color.primary, fontWeight: "500" }}>Continue</Text>
            </View>
        </AuthWarper>
    )
}

export default OptVerification