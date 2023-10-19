import { Image, View } from "react-native";
import { HeadingTxt, PTxt } from "../../globalComponents/customTxts";
import { CENTER_DEFAULT, SEAHAWKS_COLORS, getCustomShadowStyles } from "../../styles/globalStylesVars.js"
import { Button } from "../../globalComponents/buttons";
import { TriviaViewDataContext } from "../../providers/TriviaViewDataProvider";
import { useContext, useState } from "react";
import Fraction from "fraction.js"
import FadeUpAndOut from "../../animations/FadeUpAndOut";
import Background from "../../globalComponents/Background";

const seahawksLogo = require('../../assets/seahawks-icon.png')

function MainPresentation() {
    const { getTargetTriviaViewState } = useContext(TriviaViewDataContext);
    const [willFadeOutResultsUi, setWillFadeOutResultsUi] = useState(false);
    const [triviaScore,] = getTargetTriviaViewState("triviaScore")
    let triviaScoreFraction = new Fraction(triviaScore);

    // show the following: 
    // RESULT
    // Seahawks emoji
    // if the user gets everything right, then show the tropy emoji 
    // user's score

    // show the following the buttons: 
    // Review answers  
    // Take another quiz! 

    // if the user gets everything right


    return (
        <Background>
            <FadeUpAndOut
                _willFadeIn={[true, () => { }]}
                willFadeOut={willFadeOutResultsUi}
                style={{
                    ...CENTER_DEFAULT.center,
                    width: "100%",
                    height: "100%",
                }}
            >
                <View
                    style={{
                        ...CENTER_DEFAULT.center,
                        width: "100%",
                        marginTop: "20%"
                    }}
                >
                    <Image
                        style={{
                            width: 100,
                            height: 100
                        }}
                        source={seahawksLogo}
                    />
                </View>
                <View
                    style={{
                        ...CENTER_DEFAULT.center,
                        height: 50
                    }}
                >
                    <HeadingTxt
                        style={{
                            color: SEAHAWKS_COLORS.home['2nd'],
                            width: "100%",
                            textAlign: 'center',
                        }}
                        fontSize={30}
                    >
                        RESULT:
                    </HeadingTxt>
                </View>
                <View
                    style={{
                        ...CENTER_DEFAULT.center,
                        marginTop: 30,
                        marginBottom: 10
                    }}
                >
                    <HeadingTxt
                        color="white"
                        fontSize={24}
                    >
                        Your score:
                    </HeadingTxt>
                    {/* <PTxt>{triviaScoreFraction}</PTxt> */}
                    <PTxt
                        txtColor="white"
                        fontSize={24}
                    >
                        8/10
                    </PTxt>
                </View>
                <View style={{ ...CENTER_DEFAULT.center, flexDirection: 'row', marginTop: 25 }}>
                    <Button
                        dynamicStyles={{
                            ...getCustomShadowStyles('main', SEAHAWKS_COLORS.home["3rd"]),
                            padding: 20,
                            width: 150,
                            borderRadius: 10,
                            marginRight: 15
                        }}
                        backgroundColor={SEAHAWKS_COLORS.home["3rd"]}
                    >
                        <PTxt
                            style={{ textAlign: 'center' }}
                        >
                            Review Qs
                        </PTxt>
                    </Button>
                    <Button
                        backgroundColor={SEAHAWKS_COLORS.home["2nd"]}
                        dynamicStyles={{
                            ...getCustomShadowStyles('main', SEAHAWKS_COLORS.home["2nd"]),
                            marginLeft: 15,
                            padding: 20,
                            width: 150,
                            borderRadius: 10,
                        }}
                    >
                        <PTxt
                            style={{ textAlign: 'center' }}
                        >
                            Play again!
                        </PTxt>
                    </Button>
                </View>
            </FadeUpAndOut>
        </Background>
    )
};

export default MainPresentation;