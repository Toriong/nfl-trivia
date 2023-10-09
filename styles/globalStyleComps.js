import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { FONT_FAMILY_MAIN } from './globalStylesVars';

const CustomText = ({ children, dynamicStyles = {} }) => {
    return (
        <Text
            style={{
                ...dynamicStyles,
                fontFamily: FONT_FAMILY_MAIN
            }}
        >
            {children}
        </Text>
    );
};


const styles = StyleSheet.create({
    defaultStyles: {

    }
});

export default CustomText;
