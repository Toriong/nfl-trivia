import { useContext } from "react";
import CustomLocalStorage from "../../../../globalHelperFns/localStorage";
import { TriviaViewDataContext } from "../../../../providers/TriviaViewDataProvider";
import { useNavigation } from "@react-navigation/native";
import { CENTER_DEFAULT } from "../../../../styles/globalStylesVars";
import { useMediaQuery } from "react-responsive";

const storage = new CustomLocalStorage();

const ReviewQsNavigationBtns = ({ handleOnSubmitBtnPress }) => {
    const navigationObj = useNavigation();
    const isBelow575PxViewPortWidth = useMediaQuery({ query: "(max-width: 575px)" });
    const {
        _stylePropForQuestionAndPicLayout,
        _questionsToDisplayOntoUI,
        _wasSubmitBtnPressed,
        _selectedAnswer,
        _willFadeOutQuestionTxt,
        _willRenderCorrectAnsUI
    } = useContext(TriviaViewDataContext);
    const [, setWillFadeOutQuestionTxt] = _willFadeOutQuestionTxt;
    const [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [, setWasSubmitBtnPressed] = _wasSubmitBtnPressed;
    const [, setSelectedAnswer] = _selectedAnswer;
    const [willRenderCorrectAnsUI, setWillRenderCorrectAnsUI] = _willRenderCorrectAnsUI;
    const [stylePropForQuestionAndPicLayout, setStylePropForQuestionAndPicLayout] = _stylePropForQuestionAndPicLayout;
    const indexOfCurrentQuestionDisplayed = questionsToDisplayOntoUI.findIndex(({ isCurrentQDisplayed }) => isCurrentQDisplayed);
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
            setWillFadeOutCorrectAnsPicture(false);
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
                    handleOnPress={willRenderCorrectAnsUI ? handleOnShowQuestionBtnPress : handleOnSubmitBtnPress}
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