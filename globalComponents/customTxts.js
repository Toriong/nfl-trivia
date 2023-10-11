import { FONT_FAMILY_MAIN, TEXT_SIZE } from "../styles/globalStylesVars";
import { StyleSheet, Text } from "react-native";

function getGlobalStyles(fontSize) {
    return StyleSheet.create({
        main: {
            fontFamily: FONT_FAMILY_MAIN,
            fontSize: fontSize
        },
    })
}

export function PTxt({ children: txt, fontSize = 21, style, _testID = "", willAddQuotes }) {
    const globalStyles = getGlobalStyles(fontSize);
    const _style = style ? { ...globalStyles.main, ...style } : globalStyles.main

    return (
        <Text testID={_testID} style={{ ..._style, color: 'white' }}>
            {willAddQuotes ? `"${txt}"` : txt}
        </Text>
    )
}


export function HeadingTxt({ children: txt, fontSize = TEXT_SIZE.LARGE, style, willAddQuotes, _testID = "" }) {
    const globalStyles = getGlobalStyles(fontSize);
    const _style = style ? { ...globalStyles.main, ...style } : globalStyles.main

    return (
        <Text testID={_testID} style={_style}>
            {willAddQuotes ? `"${txt}"` : txt}
        </Text>
    )
}