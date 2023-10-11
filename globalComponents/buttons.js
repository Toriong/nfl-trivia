import React from 'react';
import { TouchableOpacity } from 'react-native';

export function Button({ children, handleOnPress, dynamicStyles = {} }) {
    return (
        <TouchableOpacity
            style={{ ...dynamicStyles }}
            onPress={handleOnPress}
        >
            {children}
        </TouchableOpacity>
    );
}



