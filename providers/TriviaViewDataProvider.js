import React, { createContext, useState } from 'react';

export const TriviaViewDataContext = createContext();

export const TriviaViewDataProvider = ({ children }) => {
    const [isGettingTriviaQuestions, setIsGettingTriviaQuestions] = useState(true);
    const [triviaScore, setTriviaScore] = useState(0);
    const _isTriviaModeOn = useState(true);
    const _selectedAnswer = useState({ answer: "", letter: "" });
    const _willShowLoadingUI = useState(true);
    const _willPresentErrorUI = useState(false);
    const _willFadeOutLoadingQuestionsLayout = useState(false);
    const _willFadeLoadingQuestionsIn = useState(true);
    const _willFadeOutQuestionPromptPictures = useState(false)
    const _wasSelectedAnswerCorrect = useState(false);
    const _willRenderQuestionUI = useState(true);
    const _willRenderCorrectAnsUI = useState(false);
    const _stylePropForQuestionAndPicLayout = useState({});
    const _isReviewingQs = useState(false);
    const [willFadeOutCorrectAnsPicture, setWillFadeOutCorrectAnsPicture] = useState(false);
    const _willFadeOutQuestionTxt = useState(false);
    const _wasSubmitBtnPressed = useState(false);
    const _intervalTimer = useState(null);
    const [timerMs, setTimerMs] = useState(60_000);
    const [willPresentErrorUI, setWillPresentErrorUI] = useState(false);
    const _willStartTimer = useState(false);
    const triviaViewDataArr = [
        {
            name: 'willPresentErrorUI',
            state: [willPresentErrorUI, setWillPresentErrorUI]
        },
        {
            name: 'timerMs',
            state: [timerMs, setTimerMs]
        },
        {
            name: 'willFadeOutCorrectAnsPicture',
            state: [willFadeOutCorrectAnsPicture, setWillFadeOutCorrectAnsPicture]
        },
        {
            name: "isGettingTriviaQuestions",
            state: [isGettingTriviaQuestions, setIsGettingTriviaQuestions]
        },
        {
            name: "triviaScore",
            state: [triviaScore, setTriviaScore]
        },
    ]

    function getTargetTriviaViewState(stateName) {
        try {
            if (!stateName) {
                throw new Error("Did not provide the 'stateName.'")
            }

            const stateAndSetter = triviaViewDataArr.find(({ name }) => name === stateName)?.state;

            if (!stateAndSetter?.length) {
                throw new Error(`Unable to get the target state. The ${stateName} is invalid.`)
            }

            return stateAndSetter;
        } catch (error) {
            console.error('An error has occurred in getting the target state: ', error);

            return [];
        }
    }

    function updateTargetTriviaViewState(setterName) {
        try {
            if (!setterName) {
                throw new Error('Must provide the name of the setter.')
            };

            const state = triviaViewDataArr.find(({ name }) => name === setterName);

            if (!state) {
                throw new Error('The target state does not exist.')
            };

            return state;
        } catch (error) {
            console.error(`An error has occurred in getting the state with the setter name of '${setterName}.' Error message: `, error);

            return null;
        }
    }

    return (
        <TriviaViewDataContext.Provider
            value={{
                getTargetTriviaViewState,
                updateTargetTriviaViewState,
                _isReviewingQs,
                _stylePropForQuestionAndPicLayout,
                _willRenderCorrectAnsUI,
                _wasSubmitBtnPressed,
                _willFadeOutQuestionTxt,
                _willShowLoadingUI,
                _selectedAnswer,
                _willPresentErrorUI,
                _willFadeOutLoadingQuestionsLayout,
                _willFadeLoadingQuestionsIn,
                _willFadeOutQuestionPromptPictures,
                _wasSelectedAnswerCorrect,
                _willRenderQuestionUI,
                _willStartTimer,
                _isTriviaModeOn,
                _intervalTimer
            }}
        >
            {children}
        </TriviaViewDataContext.Provider>
    );
};
