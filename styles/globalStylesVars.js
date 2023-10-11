import { StyleSheet } from 'react-native';

export const CENTER_DEFAULT = StyleSheet.create({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const TEXT_SIZE = Object.freeze({
    SMALL: 12,
    MEDIUM: 16,
    DEFAULTPTXT: 18,
    LARGE: 20,
    XLARGE: 24,
    XXLARGE: 28,
    XXXLARGE: 32,
    XXXXLARGE: 36,
    XXXXXLARGE: 40,
    XXXXXXLARGE: 44,
    XXXXXXXLARGE: 48,
})

export const SEAHAWKS_COLORS = {
    home: {
        "1st": "#002244",
        "2nd": "",
        "3rd": ""
    },
    away: {
        "1st": "",
        "2nd": "",
        "3rd": ""
    },
    alternative: {
        "1st": "",
        "2nd": "",
        "3rd": ""
    }
}

export const FONT_FAMILY_MAIN = 'sans-serif';
