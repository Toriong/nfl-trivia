import React, { useContext } from 'react';
import { Button } from '../../../../globalComponents/buttons';
import { PTxt } from '../../../../globalComponents/customTxts';
import CustomLocalStorage from '../../../../globalHelperFns/localStorage';
import { useNavigation } from '@react-navigation/native';
import { TriviaViewDataContext } from '../../../../providers/TriviaViewDataProvider';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';

const storage = new CustomLocalStorage();

const NextQuestion = () => {
    const navigationObj = useNavigation();
    const {
        _intervalTimer,
        _stylePropForQuestionAndPicLayout,
        _wasSubmitBtnPressed,
        _selectedAnswer,
        _wasSelectedAnswerCorrect,
        _willRenderQuestionUI
    } = useContext(TriviaViewDataContext);
    const {
        _questionsToDisplayOntoUI
    } = useContext(TriviaBusinessDataContext);
    const [, setWillRenderQuestionUI] = _willRenderQuestionUI;
    const [, setWasSelectedAnswerCorrect] = _wasSelectedAnswerCorrect;
    const [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [, setIntervalTimer] = _intervalTimer;
    const [selectedAnswer, setSelectedAnswer] = _selectedAnswer;
    const [wasSubmitBtnPressed, setWasSubmitBtnPressed] = _wasSubmitBtnPressed;
    const [stylePropForQuestionAndPicLayout, setStylePropForQuestionAndPicLayout] = _stylePropForQuestionAndPicLayout;
    let currentQuestionIndex = questionsToDisplayOntoUI.findIndex(({ isCurrentQDisplayed }) => isCurrentQDisplayed);
    currentQuestionIndex = currentQuestionIndex === -1 ? 0 : currentQuestionIndex;
    const btnTxt = ((currentQuestionIndex + 1) > (questionsToDisplayOntoUI.length - 1)) ? "View Results" : "Next";

    function handleNextQuestionBtnPress() {
        setWillRenderCorrectAnsUI(false);
        setWillFadeOutQuestionPromptPictures(false);
        setWillFadeOutCorrectAnsPicture(false);
        setWillFadeOutQuestionTxt(false);
        setWasSubmitBtnPressed(false);
        setWasSelectedAnswerCorrect(false);
        const selectedAnswerClone = structuredClone(selectedAnswer);
        setSelectedAnswer({ answer: "", letter: "" });
        setTimeout(() => {
            const nextQuestionToDisplayIndex = currentQuestionIndex + 1;
            setQuestionsToDisplayOntoUI(questions => questions.map((question, index) => {
                if (currentQuestionIndex === index) {
                    const _updatedQuestion = {
                        ...question,
                        isCurrentQDisplayed: false,
                        selectedAnswer: selectedAnswerClone.answer
                    }

                    return _updatedQuestion;
                }

                if (nextQuestionToDisplayIndex === index) {
                    return {
                        ...question,
                        isCurrentQDisplayed: true
                    }
                }

                return question;
            }))
            setTimeout(() => {
                setWillRenderQuestionUI(true);
            }, 150)
        }, 150)
    };

    function handleViewResultsBtn() {
        setIntervalTimer(intervalTimer => {
            clearInterval(intervalTimer);
            return null;
        });
        storage.setData('triviaScrnHeight', stylePropForQuestionAndPicLayout)
        navigationObj.navigate('Results');
    };

    function handleOnPress() {
        ((currentQuestionIndex + 1) > questionsToDisplayOntoUI.length) ? handleViewResultsBtn() : handleNextQuestionBtnPress();
    };

    return (
        <Button
            isDisabled={!wasSubmitBtnPressed}
            handleOnPress={handleOnPress}
            dynamicStyles={{
                backgroundColor: 'grey',
                padding: 10,
                borderRadius: 10,
                opacity: !wasSubmitBtnPressed ? .3 : 1
            }}
        >
            <PTxt style={{ textAlign: 'center' }}>
                {btnTxt}
            </PTxt>
        </Button>
    );
};

export default NextQuestion;
