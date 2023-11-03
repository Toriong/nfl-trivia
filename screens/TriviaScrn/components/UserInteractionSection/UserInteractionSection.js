import React, { useContext, useState } from 'react';
import { PTxt } from '../../../../globalComponents/customTxts';
import { View } from 'react-native';
import { useMediaQuery } from "react-responsive";
import { TriviaViewDataContext } from '../../../../providers/TriviaViewDataProvider';
import { CENTER_DEFAULT } from '../../../../styles/globalStylesVars';
import SubmitAnswerBtn from '../buttons/SubmitAnswerBtn';
import ReviewQsNavigationBtns from './ReviewQsNavigationBtns';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';
import FadeUpAndOut from '../../../../animations/FadeUpAndOut';
import NextQuestion from '../buttons/NextQuestion';

const UserInteractionSection = () => {
    const isBelow575PxViewPortWidth = useMediaQuery({ query: "(max-width: 575px)" });
    const {
        _wasSubmitBtnPressed,
        _selectedAnswer,
        _isTriviaModeOn,
        _wasSelectedAnswerCorrect,
        _willFadeOutQuestionTxt,
        _willRenderCorrectAnsUI,
        _isReviewingQs,
        _willFadeInQuestionChoicesAndAnsUI,
        _willFadeOutQuestionChoicesAndAnsUI
    } = useContext(TriviaViewDataContext);
    const {
        _questionsToDisplayOntoUI
    } = useContext(TriviaBusinessDataContext);
    const [willFadeOutQuestionChoicesAndAnsUI,] = _willFadeOutQuestionChoicesAndAnsUI;
    const [isReviewingQs,] = _isReviewingQs;
    const [, setWillFadeOutQuestionTxt] = _willFadeOutQuestionTxt;
    const [wasSelectedAnswerCorrect, setWasSelectedAnswerCorrect] = _wasSelectedAnswerCorrect;
    const [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [wasSubmitBtnPressed, setWasSubmitBtnPressed] = _wasSubmitBtnPressed;
    const [isTriviaModeOn,] = _isTriviaModeOn;
    const [selectedAnswer,] = _selectedAnswer;
    const [willFadeInQuestionChoicesAndAnsUI, setWillFadeInQuestionChoicesAndAnsUI] = _willFadeInQuestionChoicesAndAnsUI;
    const [, setWillRenderCorrectAnsUI] = _willRenderCorrectAnsUI;
    console.log("sup")
    console.log("questionsToDisplayOntoUI: ", questionsToDisplayOntoUI)
    const indexOfCurrentQuestionDisplayed = questionsToDisplayOntoUI?.length ? questionsToDisplayOntoUI.findIndex(({ isCurrentQDisplayed }) => isCurrentQDisplayed) : -1;
    const { answer } = questionsToDisplayOntoUI?.length ? (questionsToDisplayOntoUI[indexOfCurrentQuestionDisplayed] ?? questionsToDisplayOntoUI[0]) : {};
    let selectedAnswerContainerStyle = { top: 30 };
    let btnContainerStyle = { marginTop: 20 }
    let colorForAnswerShownTxts = wasSubmitBtnPressed ? (wasSelectedAnswerCorrect ? 'green' : 'red') : 'white';
    let selectedAnsContainerStyles = { marginTop: 20 }

    if (isReviewingQs && !wasSubmitBtnPressed) {
        colorForAnswerShownTxts = 'white';
    };

    if (isBelow575PxViewPortWidth) {
        selectedAnswerContainerStyle = {};
        btnContainerStyle = {};
    }

    function handleOnSubmitBtnPress() {
        setWasSubmitBtnPressed(true);
        const _answer = typeof answer === 'boolean' ? answer.toString() : answer
        setWasSelectedAnswerCorrect(_answer === selectedAnswer.answer)
        setWillFadeOutQuestionTxt(true);
        setQuestionsToDisplayOntoUI(questions => questions.map(question => {
            if (question.isCurrentQDisplayed) {
                return {
                    ...question,
                    selectedAnswer: selectedAnswer.answer
                };
            };

            return question;
        }));

        setTimeout(() => {
            setWillRenderQuestionUI(false);
            setTimeout(() => {
                setWillRenderCorrectAnsUI(true);
            }, 250)
        }, 450);
    };

    console.log('will render jsx...')

    return (
        <FadeUpAndOut
            dynamicStyles={{ width: "100%" }}
            _willFadeIn={[willFadeInQuestionChoicesAndAnsUI, setWillFadeInQuestionChoicesAndAnsUI]}
            willFadeOut={willFadeOutQuestionChoicesAndAnsUI}
        >
            <View
                style={{
                    bottom: 0,
                    position: 'fixed',
                    width: "100%"
                }}
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
                    <View
                        style={{
                            ...selectedAnsContainerStyles,
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        colorForAnswerShownTxts={colorForAnswerShownTxts}
                    >
                        <PTxt style={{ color: 'white', textAlign: 'center' }}>
                            {(selectedAnswer.letter && selectedAnswer.answer) ? `${selectedAnswer.letter}. ${selectedAnswer.answer}` : ''}
                        </PTxt>
                    </View>
                </View>
                {
                    isTriviaModeOn && (
                        <View style={{ ...btnContainerStyle, top: 3, width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <SubmitAnswerBtn handleOnPress={handleOnSubmitBtnPress} />
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
                        <NextQuestion />
                        :
                        <ReviewQsNavigationBtns handleOnSubmitBtnPress={handleOnSubmitBtnPress} />
                    }
                </View>
            </View>
        </FadeUpAndOut>
    );
};

export default UserInteractionSection;
