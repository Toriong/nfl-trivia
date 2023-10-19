import { View } from "react-native";
import { SEAHAWKS_COLORS } from "../styles/globalStylesVars";

function Background({
    children,
    customStyles = {},
    backgroundColor = SEAHAWKS_COLORS.home["1st"]
}) {
    return (
        <View
            style={{
                ...customStyles,
                width: "100%",
                height: "100%",
                backgroundColor: backgroundColor
            }}
        >
            {children}
        </View>
    )
}

export default Background;



