import React from 'react';
import { Platform } from "react-native"
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';

const AdaptativeTouchable = (props:any) => {

    let TouchableThing = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableThing = TouchableNativeFeedback
    }

    return (
        <TouchableThing style={props.style} onPress={props.onPress}>
            {props.children}
        </TouchableThing>
    );

}

export default AdaptativeTouchable;