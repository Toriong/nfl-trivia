import React from 'react';
import { TouchableOpacity } from 'react-native';

export function Button({ children, handleOnClick, dynamicStyles = {} }) {
    return (
        <TouchableOpacity
            style={{ ...dynamicStyles }}
            onPress={handleOnClick}
        >
            {children}
        </TouchableOpacity>
    );
}



