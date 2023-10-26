import React, { createContext, useState } from 'react';

export const TriviaViewDataContext = createContext();

export const TriviaViewDataProvider = ({ children }) => {
    const [isGettingTriviaQuestions, setIsGettingTriviaQuestions] = useState(true);
    const [isTriviaModeOn, setIsTriviaModeOn] = useState(true);
    const [triviaScore, setTriviaScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState({ answer: "", letter: "" });
    const _willShowLoadingUI = useState(true);
    const _willPresentErrorUI = useState(false);
    const _willFadeOutLoadingQuestionsLayout = useState(false);
    const _willFadeLoadingQuestionsIn = useState(true);
    const [stylePropForQuestionAndPicLayout, setStylePropForQuestionAndPicLayout] = useState({});
    const [willRenderQuestionUI, setWillRenderQuestionUI] = useState(true);
    const [isReviewingQs, setIsReviewingQs] = useState(false);
    const [willRenderCorrectAnsUI, setWillRenderCorrectAnsUI] = useState(false);
    const [willFadeOutQuestionPromptPictures, setWillFadeOutQuestionPromptPictures] = useState(false)
    const [willFadeOutCorrectAnsPicture, setWillFadeOutCorrectAnsPicture] = useState(false);
    const [willFadeOutQuestionTxt, setWillFadeOutQuestionTxt] = useState(false);
    const [wasSubmitBtnPressed, setWasSubmitBtnPressed] = useState(false);
    const [intervalTimer, setIntervalTimer] = useState(null);
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
            name: 'intervalTimer',
            state: [intervalTimer, setIntervalTimer]
        },
        {
            name: 'wasSubmitBtnPressed',
            state: [wasSubmitBtnPressed, setWasSubmitBtnPressed]
        },
        {
            name: 'isReviewingQs',
            state: [isReviewingQs, setIsReviewingQs]
        },
        {
            name: 'willFadeOutQuestionTxt',
            state: [willFadeOutQuestionTxt, setWillFadeOutQuestionTxt]
        },
        {
            name: 'willFadeOutQuestionPromptPictures',
            state: [willFadeOutQuestionPromptPictures, setWillFadeOutQuestionPromptPictures]
        },
        {
            name: 'willFadeOutCorrectAnsPicture',
            state: [willFadeOutCorrectAnsPicture, setWillFadeOutCorrectAnsPicture]
        },
        {
            name: "willRenderCorrectAnsUI",
            state: [willRenderCorrectAnsUI, setWillRenderCorrectAnsUI]
        },
        {
            name: 'willRenderQuestionUI',
            state: [willRenderQuestionUI, setWillRenderQuestionUI]
        },
        {
            name: 'selectedAnswer',
            state: [selectedAnswer, setSelectedAnswer]
        },
        {
            name: "isGettingTriviaQuestions",
            state: [isGettingTriviaQuestions, setIsGettingTriviaQuestions]
        },
        {
            name: 'stylePropForQuestionAndPicLayout',
            state: [stylePropForQuestionAndPicLayout, setStylePropForQuestionAndPicLayout]
        },
        {
            name: "triviaScore",
            state: [triviaScore, setTriviaScore]
        },
        {
            name: 'isTriviaModeOn',
            state: [isTriviaModeOn, setIsTriviaModeOn]
        }
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
                _willShowLoadingUI,
                _willPresentErrorUI,
                _willFadeOutLoadingQuestionsLayout,
                _willFadeLoadingQuestionsIn,
                _willStartTimer
            }}
        >
            {children}
        </TriviaViewDataContext.Provider>
    );
};
