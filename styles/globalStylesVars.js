import { StyleSheet, Platform } from 'react-native';

export const CENTER_DEFAULT = StyleSheet.create({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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

let globalElementShadowStylesObj = {
    main: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 5,
    },
    secondary: {
        shadowColor: '#000',
        shadowOffset: {
            width: -2,
            height: 4
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderColor: '#dee2e6',
        elevation: (Platform.OS === 'android') ? 5 : 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
}

export const GLOBAL_ELEMENT_SHADOW_STYLES = StyleSheet.create(globalElementShadowStylesObj);

export function getCustomShadowStyles(field, shadowColor){
    let shadowStylesObj = JSON.parse(JSON.stringify(globalElementShadowStylesObj));
    shadowStylesObj[field].shadowColor = shadowColor;
    shadowStylesObj[field].shadowRadius = 8;
    shadowStylesObj[field].shadowOffset.width = 8;
    shadowStylesObj[field].shadowOffset.height = 20;


    

    return StyleSheet.create(shadowStylesObj);
}

export const SEAHAWKS_COLORS = {
    home: {
        "1st": "#002244",
        "2nd": "#69BE28",
        "3rd": "#A5ACAF"
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

export const NFL_TEAMS = [
    {
        team: 'Seahawks',
        colors: SEAHAWKS_COLORS
    }    
]

export const FONT_FAMILY_MAIN = 'sans-serif';
