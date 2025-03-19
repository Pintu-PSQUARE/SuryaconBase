import React, { useEffect, useState } from 'react'
import { Text, View, TextInput } from 'react-native'
import { color, font, routes } from '../../config/Env'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AuthWarper from './AuthWarper'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../../store/hooks'
import { LoginWithNumber as LoginWithOtp } from '../../reducers/UserSlice'
import { style } from './ForgotPassword'

function LoginWithNumber() {
    const navigation:NavigationProp<ParamListBase> = useNavigation()
    const [credential, setCredential] = useState<string>("")
    const [active, setActive] = useState(false)
    const [error, setError] = useState("")
    const dispatch = useAppDispatch()
    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 5000);
    }, [error])
    return (
        <AuthWarper>
            <Text style={style.topText}>Sign in with OTP</Text>
            <Text style={style.subText}>Please enter your registered Phone number or Email ID for receiving the One-Time Password (OTP).</Text>
            <View style={{ marginTop: responsiveScreenHeight(3) }}>

                <Text style={style.errorText}>{error}</Text>
                <View style={{ flexDirection: "row", gap: responsiveScreenWidth(3) }}>
                    <View style={style.leftIcon}>
                        <FontAwesome name="user-o" style={style.icon} />
                    </View>
                    <TextInput
                        style={[style.input, {borderWidth:1, borderColor:error? color.red:color.primary}]}
                        keyboardType="default"
                        returnKeyType="done"
                        placeholder="Mobile No. or Email ID"
                        placeholderTextColor={color.black28}
                        onChangeText={(e) => {
                            if (!e) {
                                setCredential("");
                                return;
                            }
                            const firstChar:any= e.charAt(0);
                            if (!isNaN(firstChar) && firstChar !== " ") {
                                if (e.length === 10) setActive(true)
                                if (e.length !== 10) setActive(false)
                                const regex = /^\d+$/;
                                if (!regex.test(e)) return;
                                setCredential(e);
                                return;
                            } else if (e) {
                                const regex = /@gmail\.com$/;
                                if (regex.test(e)) setActive(true)
                                if (!regex.test(e)) setActive(false)


                                setCredential(e);
                                return;
                            }
                        }}
                    />
                    <View style={{ width: responsiveScreenWidth(13), backgroundColor: color.primary, }}>
                    </View>
                </View>
            </View>

            <View style={{ width: responsiveScreenWidth(60), alignSelf: "center", flexDirection: "row", justifyContent: "flex-end" }}>
                <Text onPress={() => navigation.navigate(routes.LOGIN)} style={{ fontSize: responsiveScreenFontSize(1.4), lineHeight: responsiveScreenHeight(2), paddingVertical: responsiveScreenHeight(1), color: color.secondary, textAlign: "center" }}>Sign in with Employee ID</Text>
            </View>
            <View style={{ flex: 1 }}></View>

            <View style={style.btn}>
                <Text onPress={() => {
                    if (!credential) {
                        setError("Mobile No. or Email ID is required")
                        return
                    }
                    const firstChar:any = credential.charAt(0);

                    if (!isNaN(firstChar)) {
                        if (credential.length !== 10) {
                            setError("Invalid Mobile No.")
                            return
                        }
                    }
                    else if (isNaN(firstChar)) {
                        const regex = /@gmail\.com$/;
                        if (!regex.test(credential)) {
                            setError("Invalid email ID")
                            return
                        }
                    }
                    dispatch(LoginWithOtp({ credential })).then((e) => {
                        if (!e.payload.success) {
                            setError(e.payload.message)
                        }
                        else {
                            navigation.navigate(routes.OTP, { credential, page: "login" })
                        }
                    })
                }} style={{ fontSize: responsiveScreenFontSize(2.2), color: active ? color.primary : color.primary2, fontWeight: "500", fontFamily:font.NunitoRegular }}>Continue</Text>
            </View>

        </AuthWarper>
    )
}

export default LoginWithNumber
