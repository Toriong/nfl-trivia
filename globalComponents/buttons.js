import React from 'react';
import { Pressable } from 'react-native';

export function Button({ children, handleOnPress, isDisabled, backgroundColor, dynamicStyles = {}, disabledOpacity = .3, willShowDisableOpacity }) {
    let defaultStyles = {}

    if (backgroundColor) {
        defaultStyles = { backgroundColor: backgroundColor }
    }

    return (
        <Pressable
            disabled={isDisabled}
            style={{ ...dynamicStyles, ...defaultStyles, opacity: willShowDisableOpacity ? (isDisabled ? disabledOpacity : 1) : 1 }}
            onPress={handleOnPress}
        >
            {children}
        </Pressable>
    );
}



