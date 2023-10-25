import { Image, View } from "react-native";
import { HeadingTxt, PTxt } from "../../globalComponents/customTxts";
import { CENTER_DEFAULT, SEAHAWKS_COLORS, getCustomShadowStyles } from "../../styles/globalStylesVars.js"
import { Button } from "../../globalComponents/buttons";
import { TriviaViewDataContext } from "../../providers/TriviaViewDataProvider";
import { useContext, useState } from "react";
import Fraction from "fraction.js"
import FadeUpAndOut from "../../animations/FadeUpAndOut";
import Background from "../../globalComponents/Background";
import { TriviaBusinessDataContext } from "../../providers/TriviaBusinessDataProvider";
import { useNavigation } from "@react-navigation/native";
import CustomLocalStorage from "../../globalHelperFns/localStorage";
import { MULTIPLE_CHOICE_LETTERS } from "../../globalVars";
import { getTriviaQuestions } from "../../services/questions/get";
import { customAlert } from "../../globalHelperFns/customAlert";

const seahawksLogo = require('../../assets/seahawks-icon.png');
const storage = new CustomLocalStorage();

function MainPresentation() {
    const navigationObj = useNavigation();
    const { _questionsToDisplayOntoUI } = useContext(TriviaBusinessDataContext);
    const { getTargetTriviaViewState, _willShowLoadingUI, _willPresentErrorUI } = useContext(TriviaViewDataContext);
    const [, setWillShowLoadingUI] = _willShowLoadingUI;
    const [, setWillPresentErrorUI] = _willPresentErrorUI;
    const [, setIsTriviaModeOn] = getTargetTriviaViewState('isTriviaModeOn');
    const [, setSelectedAnswer] = getTargetTriviaViewState('selectedAnswer');;
    const [, setStylePropForQuestionAndPicLayout] = getTargetTriviaViewState('stylePropForQuestionAndPicLayout')
    const [, setWillRenderQuestionUI] = getTargetTriviaViewState('willRenderQuestionUI')
    const [, setWillRenderCorrectAnsUI] = getTargetTriviaViewState('willRenderCorrectAnsUI')
    const [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [, setWillFadeOutQuestionPromptPictures] = getTargetTriviaViewState('willFadeOutQuestionPromptPictures');
    const [, setWillFadeOutCorrectAnsPicture] = getTargetTriviaViewState('willFadeOutCorrectAnsPicture');
    const [, setWillFadeOutQuestionTxt] = getTargetTriviaViewState('willFadeOutQuestionTxt');
    const [, setIsReviewingQs] = getTargetTriviaViewState('isReviewingQs');
    const [, setWasSubmitBtnPressed] = getTargetTriviaViewState('wasSubmitBtnPressed');
    const [, setTimerMs] = getTargetTriviaViewState('timerMs');
    const [, setWillStartTimer] = getTargetTriviaViewState('willStartTimer')
    const [willFadeOutResultsUi, setWillFadeOutResultsUi] = useState(false);
    const [isReviewQsBtnDisabled, setIsReviewQsBtnDisabled] = useState(false);
    const correctAnswersNum = questionsToDisplayOntoUI.filter(question => {
        return question.answer === question.selectedAnswer
    }).length;

    async function handleReviewQsBtnPress() {
        try {
            setWasSubmitBtnPressed(false);
            setIsReviewingQs(true);
            setWillFadeOutQuestionPromptPictures(false);
            setWillFadeOutCorrectAnsPicture(false);
            setWillFadeOutQuestionTxt(false);
            setIsTriviaModeOn(false);
            setWillRenderQuestionUI(true);
            setWillRenderCorrectAnsUI(false);
            const _stylePropForQuestionAndPicLayout = await storage.getData('triviaScrnHeight');
            setStylePropForQuestionAndPicLayout(_stylePropForQuestionAndPicLayout);
            setQuestionsToDisplayOntoUI(questions => questions.map((question, index, arrBeingMapped) => {
                return {
                    ...question,
                    isCurrentQDisplayed: index === (arrBeingMapped.length - 1)
                }
            }));
            const { selectedAnswer, choices, pictures } = questionsToDisplayOntoUI.at(-1);

            if (pictures) {
                setSelectedAnswer({ answer: selectedAnswer })
                navigationObj.navigate('Trivia');
                return;
            }

            const indexOfSelectedChoice = choices.findIndex(choice => choice === selectedAnswer);
            setSelectedAnswer({ answer: selectedAnswer, letter: MULTIPLE_CHOICE_LETTERS[indexOfSelectedChoice] });
            navigationObj.navigate('Trivia');

        } catch (error) {
            console.error("Something went wrong. Can't bring up your previous questions for review.");
        }
    };

    function handleFinallyBlockofGetTriviaQuestionsFn() {
        setTimeout(() => {
            setWillShowLoadingUI(false);
        }, 1_000);
    };

    function handleOnErrorGetTriviaQuestionReq() {
        setWillPresentErrorUI(true);
    }

    async function handlePlayAgainBtnPress() {
        try {
            const newQuestions = await getTriviaQuestions(
                '',
                handleFinallyBlockofGetTriviaQuestionsFn,
                handleOnErrorGetTriviaQuestionReq,
            );

            if(!newQuestions){
                const alertErrorTxt = "Sorry, but something went wrong. Couldn't retrieve new trivia questions. Please restart the app and try again.";
                customAlert(alertErrorTxt);

                throw new Error("Failed to get new trivia questions from server.");
            }

            setQuestionsToDisplayOntoUI(newQuestions);
            const _stylePropForQuestionAndPicLayout = await storage.getData('triviaScrnHeight');
            setStylePropForQuestionAndPicLayout(_stylePropForQuestionAndPicLayout);
            setIsReviewQsBtnDisabled(true);
            setTimerMs(60_000);
            navigationObj.navigate('Trivia');
            setTimeout(() => {
                setWillStartTimer(true);
                setIsTriviaModeOn(true);
            }, 200);
        } catch (error) {
            console.error('An error has occurred in getting restarting trivia quiz: ', error)
        }
    }

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
                    <PTxt>{correctAnswersNum}/10</PTxt>
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
                        isDisabled={isReviewQsBtnDisabled}
                        backgroundColor={SEAHAWKS_COLORS.home["3rd"]}
                        handleOnPress={handleReviewQsBtnPress}
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
                        handleOnPress={handlePlayAgainBtnPress}
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