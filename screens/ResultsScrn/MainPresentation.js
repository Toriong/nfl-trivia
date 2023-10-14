import { View } from "react-native";
import { HeadingTxt, PTxt } from "../../globalComponents/customTxts";
import { CENTER_DEFAULT } from "../../styles/globalStylesVars.js"
import { Button } from "../../globalComponents/buttons";

function MainPresentation({ score }) {
    return (
        <View style={{ display: 'flex', paddingLeft: 5, paddingRight: 5 }}>
            <View style={{ ...CENTER_DEFAULT.center }}>
                {/* show the title of the screen: "Your Score: " */}
                <HeadingTxt>Your score: </HeadingTxt>
            </View>
            <View style={{ ...CENTER_DEFAULT.center }}>
                <PTxt>{score}</PTxt>
            </View>
            <View style={{ ...CENTER_DEFAULT.center, flexDirection: 'row' }}>
                {/* create a button that will allow the user to review their questions here */}
                {/* or the "Play again" button */}
                <Button style={{ backgroundColor: "#84797D", padding: 10, borderRadius: 10 }}>
                    <PTxt>Review</PTxt>
                </Button>
                <Button style={{ backgroundColor: '#FFC157', padding: 10, borderRadius: 10 }}>
                    <PTxt>Play again</PTxt>
                </Button>
            </View>
        </View>
    )
};

export default MainPresentation;