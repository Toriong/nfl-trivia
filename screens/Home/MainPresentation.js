import { View } from "react-native";
import mainPresentationStyleSheet from "./styles";
import { Button } from '../../globalComponents/buttons'
import { HeadingTxt, PTxt } from "../../globalComponents/customTxts";
import { CENTER_DEFAULT, SEAHAWKS_COLORS } from "../../styles/globalStylesVars";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Logo from "../../globalComponents/Logo";
import { useNavigation } from "@react-navigation/native";

function MainPresentation() {
    const navigationObj = useNavigation();

    function handlePlayBtnPress(){
        navigationObj.navigate('Trivia');
    };

    return (
        <View style={{
            ...mainPresentationStyleSheet.mainView,
            position: 'relative',
        }}
        >
            <View
                style={{
                    ...CENTER_DEFAULT.center,
                    width: "100%",
                    height: "25%",
                }}
            >
                <Logo teamName='Seahawks' dimensions={{ width: 125, height: 125 }} />
            </View>
            <View style={mainPresentationStyleSheet.headerContainer}>
                <HeadingTxt
                    fontSize={26}
                >
                    SEAHAWKS TRIVIA
                </HeadingTxt>
            </View>
            <View style={mainPresentationStyleSheet.btnsContainer}>
                <Button
                    handleOnPress={handlePlayBtnPress}
                    dynamicStyles={{
                        ...mainPresentationStyleSheet.btnStyles,
                        backgroundColor: SEAHAWKS_COLORS.home['3rd']
                    }}
                >
                    <PTxt>
                        PLAY!
                    </PTxt>
                </Button>
                <Button
                    dynamicStyles={{
                        ...mainPresentationStyleSheet.btnStyles,
                        opacity: .6,
                        backgroundColor: SEAHAWKS_COLORS.home['3rd']
                    }}
                >
                    <PTxt>
                        Play to win!
                    </PTxt>
                    <FontAwesomeIcon
                        icon={faLock}
                        color="white"
                        size={24}
                    />
                </Button>
                {/* <Button
                    dynamicStyles={{
                        ...mainPresentationStyleSheet.btnStyles,
                        backgroundColor: SEAHAWKS_COLORS.home['3rd']
                    }}
                >
                    <PTxt style={{ padding: 7, textAlign: 'center' }} >
                        View all questions.
                    </PTxt>
                    <FontAwesomeIcon
                        icon={faLock}
                        color="white"
                        size={27}
                    />
                </Button> */}
                <Button
                    dynamicStyles={{
                        ...mainPresentationStyleSheet.btnStyles,
                        backgroundColor: SEAHAWKS_COLORS.home['3rd']
                    }}
                >
                    <PTxt>
                        Review Qs
                    </PTxt>
                </Button>
                <Button
                    dynamicStyles={{
                        ...mainPresentationStyleSheet.btnStyles,
                        backgroundColor: SEAHAWKS_COLORS.home['3rd']
                    }}
                >
                    <PTxt>
                        SIGN-IN
                    </PTxt>
                </Button>
            </View>
        </View>
    )
}

export default MainPresentation;
