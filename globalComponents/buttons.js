import React from 'react';
import { Pressable, TouchableOpacity } from 'react-native';

export function Button({
    children,
    handleOnPress,
    isDisabled,
    backgroundColor,
    dynamicStyles = {},
    disabledOpacity = .3,
    willShowDisableOpacity,
    zIndex = 0
}) {
    let defaultStyles = {}
    let opacityObj = { opacity: willShowDisableOpacity ? (isDisabled ? disabledOpacity : 1) : 1 };

    if (backgroundColor) {
        defaultStyles = { backgroundColor: backgroundColor }
    }

    if("opacity" in dynamicStyles){
        opacityObj = {} 
    }


    return (
        <TouchableOpacity
            disabled={isDisabled}
            style={{ ...dynamicStyles, ...defaultStyles, ...opacityObj, zIndex: zIndex }}
            onPress={handleOnPress}
        >
            {children}
        </TouchableOpacity>
    );
}



