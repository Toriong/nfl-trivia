import React from 'react';
import { TouchableOpacity } from 'react-native';

export function Button({ children, handleOnPress, isDisabled, backgroundColor,dynamicStyles = {} }) {
    let defaultStyles = {}

    if (backgroundColor) {
        defaultStyles = { backgroundColor: backgroundColor }
    }

    return (
        <TouchableOpacity
            disabled={isDisabled}
            style={{ ...dynamicStyles, ...defaultStyles }}
            onPress={handleOnPress}
        >
            {children}
        </TouchableOpacity>
    );
}



