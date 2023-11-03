import React, { useContext } from 'react';
import { PTxt } from '../../../../globalComponents/customTxts';
import { View } from 'react-native';
import CustomLocalStorage from '../../../../globalHelperFns/localStorage'
import { useMediaQuery } from "react-responsive";
import { TriviaViewDataContext } from '../../../../providers/TriviaViewDataProvider';
import { useNavigation } from '@react-navigation/native';
import { CENTER_DEFAULT, SEAHAWKS_COLORS } from '../../../../styles/globalStylesVars';

const storage = new CustomLocalStorage();

const UserAnswer = ({ children: txt, viewStyles, colorForAnswerShownTxts }) => {
    const navigationObj = useNavigation();
    const isBelow375PxViewPortWidth = useMediaQuery({ query: "(max-width: 375px)" });
    const { getTargetTriviaViewState, _questionsToDisplayOntoUI, _wasSubmitBtnPressed } = useContext(TriviaViewDataContext);
    const [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [wasSubmitBtnPressed, setWasSubmitBtnPressed] = _wasSubmitBtnPressed;
    const [willRenderCorrectAnsUI, setWillRenderCorrectAnsUI] = getTargetTriviaViewState('willRenderCorrectAnsUI');
    const [stylePropForQuestionAndPicLayout, setStylePropForQuestionAndPicLayout] = getTargetTriviaViewState('stylePropForQuestionAndPicLayout');
    let selectedAnswerContainerStyle = { top: 30 };

    if(isBelow375PxViewPortWidth){
        selectedAnswerContainerStyle = {};
    }

    function handleResultsBtnPress() {
        storage.setData('triviaScrnHeight', stylePropForQuestionAndPicLayout)
        navigationObj.navigate('Results');
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
            setWillFadeOutExplanationTxt(false);
            setWillFadeOutQuestionPromptPictures(false);
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
        < View
            style={{
                top: "12%",
            }
            }
        >
            <View
                style={{
                    width: "100%",
                    height: 70,
                    borderWidth: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...selectedAnswerContainerStyle,
                }}
            >
                <View>
                    <PTxt txtColor={colorForAnswerShownTxts}>Your answer: </PTxt>
                </View>
                <SelectedUserAnswer
                    viewStyles={selectedAnsContainerStyles}
                    colorForAnswerShownTxts={colorForAnswerShownTxts}
                >
                    {pictures && selectedAnswer.answer}
                    {!pictures && ((selectedAnswer.letter && selectedAnswer.answer) ? `${selectedAnswer.letter}. ${selectedAnswer.answer}` : '')}
                </SelectedUserAnswer>
            </View>
            {
                isTriviaModeOn && (
                    <View style={{ ...btnContainerStyle, top: 3, width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            isDisabled={selectedAnswer.answer === ""}
                            dynamicStyles={{
                                opacity: selectedAnswer.answer === "" ? .3 : 1,
                                backgroundColor: '#69BE28',
                                padding: 10,
                                borderRadius: 10,
                                ...buttonStyle
                            }}
                            handleOnPress={handleOnSubmitBtnPress}
                        >
                            <PTxt>Submit</PTxt>
                        </Button>
                    </View>
                )
            }

            <View
                style={{
                    ...CENTER_DEFAULT.center,
                    width: "100%",
                    top: "5%"
                }}
            >
                {isTriviaModeOn ?
                    <NextQuestion
                        btnTxt={((currentQuestionIndex + 1) > (questionsToDisplayOntoUI.length - 1)) ? "View Results" : "Next"}
                        wasSubmitBtnPressed={wasSubmitBtnPressed}
                        handleNextQuestionBtnPress={((currentQuestionIndex + 1) > (questionsToDisplayOntoUI.length - 1)) ? handleViewResultsBtn : handleNextQuestionBtnPress}
                    />
                    :
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
                }
            </View>
        </View >
    );
};

export default UserAnswer;
