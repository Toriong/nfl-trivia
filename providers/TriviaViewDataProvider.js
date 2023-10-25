import React, { createContext, useState } from 'react';

export const TriviaViewDataContext = createContext();

// GOAL: when the user is reviewing their questions, show the following on the UI: 
// the choices:
// -if pictures, then show the pictures 
// -if choices, then show the choices
// -show their selected answer

export const TriviaViewDataProvider = ({ children }) => {
    const [isGettingTriviaQuestions, setIsGettingTriviaQuestions] = useState(true);
    const [isTriviaModeOn, setIsTriviaModeOn] = useState(true);
    const [triviaScore, setTriviaScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState({ answer: "", letter: "" });
    const [stylePropForQuestionAndPicLayout, setStylePropForQuestionAndPicLayout] = useState({});
    const [willRenderQuestionUI, setWillRenderQuestionUI] = useState(true);
    const [isReviewingQs, setIsReviewingQs] = useState(false);
    const [willRenderCorrectAnsUI, setWillRenderCorrectAnsUI] = useState(false);
    const [willFadeOutQuestionPromptPictures, setWillFadeOutQuestionPromptPictures] = useState(false)
    const [willFadeOutCorrectAnsPicture, setWillFadeOutCorrectAnsPicture] = useState(false);
    const [willFadeOutQuestionTxt, setWillFadeOutQuestionTxt] = useState(false);
    const [wasSubmitBtnPressed, setWasSubmitBtnPressed] = useState(false);
    const [intervalTimer, setIntervalTimer] = useState(null);
    const triviaViewDataArr = [
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
                throw new Error("Unable to get the target state. The `stateName` is invalid.")
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
        <TriviaViewDataContext.Provider value={{ getTargetTriviaViewState, updateTargetTriviaViewState }}>
            {children}
        </TriviaViewDataContext.Provider>
    );
};
