import { Image, Pressable, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthWarper from './AuthWarper'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { color, routes } from '../../config/Env'
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native'
import { useAppDispatch } from '../../store/hooks'
import { ResetPassword } from '../../reducers/UserSlice'
import { style } from './ForgotPassword'

const NewPassword = () => {
    const route: any = useRoute();
    const token = route?.params?.token || false;
    const [error, setError] = useState({ newPassword: "", confirmPassword: "" })
    const [data, setData] = useState({ newPassword: "", confirmPassword: "" })
    const [active, setActive] = useState(false)
    const navigation:  NavigationProp<ParamListBase> = useNavigation()
    const [isShow, setIsShow] = useState(false)

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (data.confirmPassword === data.newPassword && data.newPassword.length >= 8) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    }, [data])
    return (
        <AuthWarper>
            <Text style={style.topText}>Create New Password</Text>
            <Text style={style.subText}>Please enter a new password for your account. </Text>
            <View style={{ gap: responsiveScreenHeight(2), marginTop: responsiveScreenHeight(3) }}>
                <View style={{ flexDirection: "row", gap: responsiveScreenWidth(3) }}>
                {
                        !isShow ?
                            <Pressable onPress={()=>setIsShow(!isShow)} style={style.leftIcon}>
                                <View style={{ height: responsiveScreenHeight(2.5) }}>
                                    <Image source={require(`../../assests/icons/eye-slash.png`)} style={{ height: "120%", aspectRatio: 1, tintColor: color.black87, }} />
                                </View>
                            </Pressable> :
                            <Pressable onPress={()=>setIsShow(!isShow)} style={[style.leftIcon, { }]}>
                                <View style={{ height: responsiveScreenHeight(2.5) }}>

                                    <Image source={require(`../../assests/icons/eye.png`)} style={{ height: "120%", aspectRatio: 1, tintColor: color.black87, }} />
                                </View>

                            </Pressable>
                    }
                    <TextInput
                        style={[style.input, {borderWidth:1, borderColor:error.newPassword? color.red:color.primary}]}
                        keyboardType="default"
                        maxLength={10}
                        returnKeyType="done"
                        secureTextEntry={!isShow}
                        placeholder="New Password"
                        placeholderTextColor={color.black28}
                        onChangeText={(e) => {
                            setData({ ...data, newPassword: e })
                        }}
                    />
                    <View style={{ width: responsiveScreenWidth(13), backgroundColor: color.primary }}>
                    </View>
                </View>
                <View style={{ flexDirection: "row", gap: responsiveScreenWidth(3), }}>
                {
                        !isShow ?
                            <Pressable onPress={()=>setIsShow(!isShow)} style={style.leftIcon}>
                                <View style={{ height: responsiveScreenHeight(2.5) }}>
                                    <Image source={require(`../../assests/icons/eye-slash.png`)} style={{ height: "120%", aspectRatio: 1, tintColor: color.black87, }} />
                                </View>
                            </Pressable> :
                            <Pressable onPress={()=>setIsShow(!isShow)} style={[style.leftIcon, { }]}>
                                <View style={{ height: responsiveScreenHeight(2.5) }}>

                                    <Image source={require(`../../assests/icons/eye.png`)} style={{ height: "120%", aspectRatio: 1, tintColor: color.black87, }} />
                                </View>

                            </Pressable>
                    }
                    <TextInput
                        style={[style.input, {borderWidth:1, borderColor:error.confirmPassword? color.red:color.primary}]}
                        keyboardType="default"
                        maxLength={10}
                        returnKeyType="done"
                        secureTextEntry={!isShow}
                        placeholder="Confirm Password"
                        placeholderTextColor={color.black28}
                        onChangeText={(e) => {
                            setData({ ...data, confirmPassword: e })
                        }}
                    />
                    <View style={{ width: responsiveScreenWidth(13), backgroundColor: color.primary, }}>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={style.btn}>
                <Text onPress={() => {
                    if (data.newPassword.length < 8) {
                        setError({ ...error, newPassword: "Password must be at least 8 characters" })
                        return
                    }
                    if (data.confirmPassword != data.newPassword) {
                        setError({ ...error, confirmPassword: "Password not matched" })
                        return
                    }
                    dispatch(ResetPassword({ token, newPassword: data.newPassword })).then((e) => {
                        if (!e.payload.success) {
                            setError({ ...error, newPassword: e.payload.message })
                        }
                        else {
                            navigation.navigate(routes.LOGIN)
                        }
                    })
                }} style={{ fontSize: responsiveScreenFontSize(2.2), color: color.primary, fontWeight: "500" }}>Submit</Text>
            </View>
        </AuthWarper>
    )
}

export default NewPassword

