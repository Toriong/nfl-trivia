import React from 'react';
import { TouchableOpacity } from 'react-native';

export function Button({ children, handleOnPress, isDisabled, dynamicStyles = {} }) {
    return (
        <TouchableOpacity
            disabled={isDisabled}
            style={{ ...dynamicStyles }}
            onPress={handleOnPress}
        >
            {children}
        </TouchableOpacity>
    );
}



