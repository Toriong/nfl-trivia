import React, { createContext, useState } from 'react';

export const TriviaViewDataContext = createContext();

export const TriviaViewDataProvider = ({ children }) => {
    const [isGettingTriviaQuestions, setIsGettingTriviaQuestions] = useState(true);
    const [isTriviaModeOn, setIsTriviaModeOn] = useState(true);
    const [triviaScore, setTriviaScore] = useState(0);
    const [stylePropForQuestionAndPicLayout, setStylePropForQuestionAndPicLayout] = useState({});
    const triviaViewDataArr = [
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
            if(!stateName){
                throw new Error("Did not provide the 'stateName.'")
            }
            
            const stateAndSetter = triviaViewDataArr.find(({ name }) => name === stateName)?.state;

            if(!stateAndSetter?.length){
                throw new Error("Unable to get the target state. The `stateName` is invalid.")
            }

            return stateAndSetter; 
        } catch(error){
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
