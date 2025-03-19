type OTPInputProps = {
    length: number,
    value: Array<string>,
    disabled: boolean,
    onChange(value: Array<string>): void, 
    error:string
}
type Nullable<T> = T | null;
import { NativeSyntheticEvent, StyleSheet,TextInput, TextInputKeyPressEventData, View } from 'react-native'
import React, { useRef } from 'react'
import { color } from '../config/Env'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
export const OtpInput: React.FunctionComponent<OTPInputProps> = ({
    length,
    disabled,
    value,
    onChange, 
    error
}) => {
    const a = 4
    const inputRefs = useRef<Array<Nullable<TextInput>>>([])
    const onChangeValue = (text: string, index: number) => {
        const newValue = value.map((item, valueIndex) => {
            if (valueIndex === index) {
                return text
            }

            return item
        })

        onChange(newValue)
    }
    const handleChange = (text: string, index: number) => {
        onChangeValue(text, index)

        if (text.length !== 0) {
            return inputRefs?.current[index + 1]?.focus()
        }

        return inputRefs?.current[index - 1]?.focus()
    }

    const handleBackspace = (event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        const { nativeEvent } = event

        if (nativeEvent.key === 'Backspace') {
            handleChange('', index)
        }
    }
    return (
        <View style={styles.container}>
            {[...Array(length)].map((_, index) => (
                <TextInput
                    key={index} // Ensure each TextInput has a unique key
                    style={[styles.input, {borderWidth:1, borderColor:error? color.red:color.primary}]}
                    ref={ref => {
                        if (ref && !inputRefs.current.includes(ref)) {
                            inputRefs.current = [...inputRefs.current, ref]
                        }
                    }}
                    maxLength={1}
                    contextMenuHidden
                    selectTextOnFocus
                    editable={!disabled}
                    keyboardType="decimal-pad"
                    testID={`OTPInput-${index}`}
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={event => handleBackspace(event, index)}

                />
            ))}
        </View>
    )
}

export default OtpInput

const styles = StyleSheet.create({

    container: {
        width: responsiveScreenWidth(85),
        alignSelf: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        fontSize: responsiveScreenFontSize(2),
        textAlign: 'center',
        height: responsiveScreenHeight(6)
        , width: responsiveScreenWidth(12), borderRadius: 10, backgroundColor: color.white
    }
})