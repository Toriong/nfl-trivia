import { Image, View } from "react-native";
import { HeadingTxt, PTxt } from "../../globalComponents/customTxts";
import { CENTER_DEFAULT, SEAHAWKS_COLORS, getCustomShadowStyles } from "../../styles/globalStylesVars.js"
import { Button } from "../../globalComponents/buttons";
import { TriviaViewDataContext } from "../../providers/TriviaViewDataProvider";
import { useContext, useState } from "react";
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
    const {
        _questionsToDisplayOntoUI
    } = useContext(TriviaBusinessDataContext);
    const {
        _willShowLoadingUI,
        _willPresentErrorUI,
        _willStartTimer,
        _isTriviaModeOn,
        _selectedAnswer,
        _stylePropForQuestionAndPicLayout,
        _willRenderQuestionUI,
        _willRenderCorrectAnsUI,
        _willFadeOutQuestionPromptPictures,
        _willFadeOutQuestionTxt,
        _isReviewingQs,
        _wasSubmitBtnPressed,
        _timerMs,
        _willFadeOutQuestionChoicesAndAnsUI,
        _willFadeInQuestionChoicesAndAnsUI,
        _willFadeOutLoadingQuestionsLayout,
        _willFadeLoadingQuestionsIn
    } = useContext(TriviaViewDataContext);
    const [, setWillFadeLoadingQuestionsIn] = _willFadeLoadingQuestionsIn
    const [, setWillFadeOutLoadingQuestionsLayout] = _willFadeOutLoadingQuestionsLayout;
    const [, setWillFadeInQuestionChoicesAndAnsUI] = _willFadeInQuestionChoicesAndAnsUI;
    const [, setWillFadeOutQuestionChoicesAndAnsUI] = _willFadeOutQuestionChoicesAndAnsUI;
    const [, setWillShowLoadingUI] = _willShowLoadingUI;
    const [, setWillPresentErrorUI] = _willPresentErrorUI;
    const [, setIsTriviaModeOn] = _isTriviaModeOn;
    const [, setSelectedAnswer] = _selectedAnswer;
    const [, setStylePropForQuestionAndPicLayout] = _stylePropForQuestionAndPicLayout
    const [, setWillRenderQuestionUI] = _willRenderQuestionUI
    const [, setWillRenderCorrectAnsUI] = _willRenderCorrectAnsUI
    const [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [, setWillFadeOutQuestionPromptPictures] = _willFadeOutQuestionPromptPictures;
    const [, setWillFadeOutQuestionTxt] = _willFadeOutQuestionTxt;
    const [, setIsReviewingQs] = _isReviewingQs;
    const [, setWasSubmitBtnPressed] = _wasSubmitBtnPressed;
    const [, setTimerMs] = _timerMs;
    const [, setWillStartTimer] = _willStartTimer;
    const [willFadeOutResultsUi, setWillFadeOutResultsUi] = useState(false);
    const [isReviewQsBtnDisabled, setIsReviewQsBtnDisabled] = useState(false);
    const correctAnswersNum = questionsToDisplayOntoUI.filter(question => {
        return question.answer === question.selectedAnswer
    }).length;

    function resetStatesOnTriviaScrn() {
        setWasSubmitBtnPressed(false);
        setWillFadeOutQuestionPromptPictures(false);
        setWillFadeOutQuestionTxt(false);
        setIsTriviaModeOn(false);
        setWillRenderQuestionUI(true);
        setWillRenderCorrectAnsUI(false);
    }


    async function handleReviewQsBtnPress() {
        try {
            if (!questionsToDisplayOntoUI.some(({ selectedAnswer }) => selectedAnswer !== null)) {
                customAlert("Looks like you didn't answer a question. Click 'Play Again' to test your Seahawks knowledge!")
                throw new Error("The user has not answer a question.")
            }

            setIsReviewingQs(true);
            setWasSubmitBtnPressed(false);
            setWillFadeOutQuestionPromptPictures(false);
            setWillFadeOutQuestionTxt(false);
            setIsTriviaModeOn(false);
            setWillRenderQuestionUI(true);
            setWillRenderCorrectAnsUI(false);
            const _stylePropForQuestionAndPicLayout = await storage.getData('triviaScrnHeight');
            setStylePropForQuestionAndPicLayout(_stylePropForQuestionAndPicLayout);
            console.log('review qs button pressed: ', questionsToDisplayOntoUI);
            let questionsToDisplayUpdated = questionsToDisplayOntoUI.filter(({ selectedAnswer }) => !!selectedAnswer)
            questionsToDisplayUpdated = questionsToDisplayUpdated?.length ?
                questionsToDisplayUpdated.map((question, index, arrBeingMapped) => {
                    return {
                        ...question,
                        isCurrentQDisplayed: index === (arrBeingMapped.length - 1)
                    }
                })
                :
                questionsToDisplayUpdated;
            console.log("questionsToDisplayUpdated: ", questionsToDisplayUpdated)
            setQuestionsToDisplayOntoUI(questionsToDisplayUpdated);
            const { selectedAnswer, choices } = questionsToDisplayUpdated.at(-1);
            const indexOfSelectedChoice = choices.findIndex(choice => choice === selectedAnswer);
            setSelectedAnswer({ answer: selectedAnswer, letter: MULTIPLE_CHOICE_LETTERS[indexOfSelectedChoice] });
            navigationObj.navigate('Trivia');

        } catch (error) {
            console.error("Something went wrong. Can't bring up your previous questions for review. Error message: ", error);
        }
    };

    function handleFinallyBlockofGetTriviaQuestionsFn() {
        setTimeout(() => {
            setWillFadeOutLoadingQuestionsLayout(true);
            setTimeout(() => {
                setWillShowLoadingUI(false);
            }, 1_000)
        }, 1_000);
    };

    function handleOnErrorGetTriviaQuestionReq() {
        const alertErrorTxt = "Sorry, but something went wrong. We couldn't retrieve the new trivia questions. Please restart the app and try again.";
        customAlert(alertErrorTxt);
        setWillPresentErrorUI(true);
    }

    function handleOnReqSuccessLogic(newQuestions) {
        setQuestionsToDisplayOntoUI(newQuestions.map((question, index) => {
            return {
                ...question,
                isCurrentQDisplayed: index === 0,
                selectedAnswer: null
            };
        }))
    }

    // WHAT IS HAPPENING:
    // unable to show the trivia screen after the user clicks on the play again button

    async function handlePlayAgainBtnPress() {
        try {
            getTriviaQuestions(
                handleFinallyBlockofGetTriviaQuestionsFn,
                handleOnErrorGetTriviaQuestionReq,
                handleOnReqSuccessLogic
            );
            resetStatesOnTriviaScrn();
            setWillShowLoadingUI(true);
            setWillFadeInQuestionChoicesAndAnsUI(true);
            setWillFadeOutQuestionChoicesAndAnsUI(false);
            setWillFadeOutLoadingQuestionsLayout(false);
            const _stylePropForQuestionAndPicLayout = await storage.getData('triviaScrnHeight');
            setStylePropForQuestionAndPicLayout(_stylePropForQuestionAndPicLayout);
            setWillFadeLoadingQuestionsIn(true);
            setIsTriviaModeOn(true);
            setSelectedAnswer({ answer: "", letter: "" })
            setIsReviewQsBtnDisabled(true);
            setTimerMs(90_000);
            setTimeout(() => {
                setWillStartTimer(true);
            }, 200);
            navigationObj.navigate('Trivia');


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
                <View
                    style={{
                        ...CENTER_DEFAULT.center,
                        flexDirection: 'row',
                        marginTop: 25
                    }}
                >
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