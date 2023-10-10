import React, { createContext, useState } from 'react';

export const TriviaViewDataContext = createContext();

export const TriviaViewDataProvider = ({ children }) => {
    const [isGettingTriviaQuestions, setIsGettingTriviaQuestions] = useState(true);
    const [indexOfQuestionToDisplayOntoTheUi, setIndexOfQuestionToDisplayOntoTheUi] = useState(0);
    const triviaViewDataArr = [
        {
            name: "isGettingTriviaQuestions",
            state: [isGettingTriviaQuestions, setIsGettingTriviaQuestions]
        },
        {
            name: "indexOfQuestionToDisplayOntoTheUi",
            state: [indexOfQuestionToDisplayOntoTheUi, setIndexOfQuestionToDisplayOntoTheUi]
        }
    ]

    function getTargetTriviaViewState(stateName) {
        return triviaViewDataArr.find(({ name }) =>  name === stateName)?.state;
    }

    function updateTargetTriviaViewState(setterName) {
        try {
            if (!setterName) {
                throw new Error('Must provide the name of the setter.')
            };

            const state = triviaViewDataArr.find(([, setter]) => setter.name === setterName);

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
