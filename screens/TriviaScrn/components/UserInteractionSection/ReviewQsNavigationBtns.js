import { useContext } from "react";
import { View } from 'react-native'
import CustomLocalStorage from "../../../../globalHelperFns/localStorage";
import { TriviaViewDataContext } from "../../../../providers/TriviaViewDataProvider";
import { useNavigation } from "@react-navigation/native";
import { CENTER_DEFAULT, SEAHAWKS_COLORS } from "../../../../styles/globalStylesVars";
import { useMediaQuery } from "react-responsive";
import { TriviaBusinessDataContext } from "../../../../providers/TriviaBusinessDataProvider";
import { Button } from "../../../../globalComponents/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { PTxt } from "../../../../globalComponents/customTxts";

const storage = new CustomLocalStorage();

const ReviewQsNavigationBtns = ({ handleShowAnswerBtnPress }) => {
    console.log("sup boi")
    const navigationObj = useNavigation();
    const isBelow575PxViewPortWidth = useMediaQuery({ query: "(max-width: 575px)" });
    const {
        _stylePropForQuestionAndPicLayout,
        _wasSubmitBtnPressed,
        _selectedAnswer,
        _willFadeOutQuestionTxt,
        _willRenderCorrectAnsUI,
        _willRenderQuestionUI
    } = useContext(TriviaViewDataContext);
    const {
        _questionsToDisplayOntoUI
    } = useContext(TriviaBusinessDataContext)
    const [, setWillFadeOutQuestionTxt] = _willFadeOutQuestionTxt;
    const [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [, setWasSubmitBtnPressed] = _wasSubmitBtnPressed;
    const [, setSelectedAnswer] = _selectedAnswer;
    const [, setWillRenderQuestionUI] = _willRenderQuestionUI;
    const [willRenderCorrectAnsUI, setWillRenderCorrectAnsUI] = _willRenderCorrectAnsUI;
    const [stylePropForQuestionAndPicLayout, setStylePropForQuestionAndPicLayout] = _stylePropForQuestionAndPicLayout;
    let indexOfCurrentQuestionDisplayed = questionsToDisplayOntoUI.findIndex(({ isCurrentQDisplayed }) => isCurrentQDisplayed);
    indexOfCurrentQuestionDisplayed = (indexOfCurrentQuestionDisplayed === -1) ? (questionsToDisplayOntoUI.length - 1) : indexOfCurrentQuestionDisplayed;
    console.log("indexOfCurrentQuestionDisplayed: ", indexOfCurrentQuestionDisplayed) 
    let selectedAnswerContainerStyle = { top: 30 };
    let btnContainerStyle = { marginTop: 20 }

    if (isBelow575PxViewPortWidth) {
        selectedAnswerContainerStyle = {};
        btnContainerStyle = {};
    };

    function handleResultsBtnPress() {
        storage.setData('triviaScrnHeight', stylePropForQuestionAndPicLayout)
        navigationObj.navigate('Results');
    };

    function handleOnShowQuestionBtnPress() {
        setWillFadeOutQuestionTxt(false);
        setWasSubmitBtnPressed(false);
        setWillRenderCorrectAnsUI(false);
        setWillRenderQuestionUI(true);
    };

    function handleArrowBtnPress(numToIncreaseOrDecreaseIndexOfCurrentQ) {
        try {
            const indexOfNewQuestion = indexOfCurrentQuestionDisplayed + (numToIncreaseOrDecreaseIndexOfCurrentQ);

            if (!questionsToDisplayOntoUI[indexOfNewQuestion]) {
                throw new Error('The question does not exist.')
            }

            setWasSubmitBtnPressed(false);
            setWillRenderCorrectAnsUI(false);
            setWillRenderQuestionUI(true);
            setWillFadeOutQuestionTxt(false);
            const { selectedAnswer, choices } = questionsToDisplayOntoUI[indexOfNewQuestion];
            const _selectedAnswer = choices ? { answer: selectedAnswer, letter: MULTIPLE_CHOICE_LETTERS[choices.findIndex(choiceTxtStr => choiceTxtStr === selectedAnswer)] } : { answer: selectedAnswer }
            setSelectedAnswer(_selectedAnswer);
            setQuestionsToDisplayOntoUI(questions => questions.map((question, index) => {
                if (indexOfCurrentQuestionDisplayed === index) {
                    return {
                        ...question,
                        isCurrentQDisplayed: false,
                    };
                }

                if (indexOfNewQuestion === index) {
                    return {
                        ...question,
                        isCurrentQDisplayed: true
                    }
                }

                return question;
            }));
        } catch (error) {
            console.error('An errror has occurred in pressing the arrow button: ', error);
        }
    }

    return (
        <>
            <View style={{
                width: "100%",
                flexDirection: 'row',
                gap: 10,
                ...CENTER_DEFAULT.center
            }}>
                <Button
                    handleOnPress={() => handleArrowBtnPress(-1)}
                    dynamicStyles={{
                        ...CENTER_DEFAULT.center,
                        borderRadius: 15,
                        padding: 13,
                        backgroundColor: SEAHAWKS_COLORS.home['3rd']
                    }}
                    willShowDisableOpacity
                    isDisabled={indexOfCurrentQuestionDisplayed === 0}
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        color="white"
                        size={27}
                    />
                </Button>
                <Button
                    handleOnPress={willRenderCorrectAnsUI ? handleOnShowQuestionBtnPress : handleShowAnswerBtnPress}
                    dynamicStyles={{
                        ...CENTER_DEFAULT.center,
                        width: 225,
                        borderRadius: 15,
                        padding: 13,
                        backgroundColor: SEAHAWKS_COLORS.home['3rd'],
                        flexDirection: 'column'
                    }}
                >
                    <PTxt style={{ width: '100%', textAlign: 'center' }}>Show {willRenderCorrectAnsUI ? 'Question' : 'Answer'}</PTxt>
                </Button>
                <Button
                    handleOnPress={() => handleArrowBtnPress(1)}
                    willShowDisableOpacity
                    dynamicStyles={{
                        ...CENTER_DEFAULT.center,
                        borderRadius: 15,
                        padding: 13,
                        backgroundColor: SEAHAWKS_COLORS.home['3rd']
                    }}
                    isDisabled={indexOfCurrentQuestionDisplayed === (questionsToDisplayOntoUI.length - 1)}
                >
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        color="white"
                        size={27}
                    />
                </Button>
            </View>
            <View style={{
                width: "100%",
                marginTop: 10,
                ...CENTER_DEFAULT.center
            }}>
                <Button
                    dynamicStyles={{
                        ...CENTER_DEFAULT.center,
                        borderRadius: 15,
                        padding: 13,
                        backgroundColor: SEAHAWKS_COLORS.home['2nd']
                    }}
                    handleOnPress={handleResultsBtnPress}
                >
                    <PTxt txtColor="white" style={{}}>
                        Results
                    </PTxt>
                </Button>
            </View>
        </>
    )
};

export default ReviewQsNavigationBtns;