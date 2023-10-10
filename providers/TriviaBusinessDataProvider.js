import React, { createContext, useState } from 'react';

export const TriviaBusinessDataContext = createContext();

export const TriviaBusinessDataProvider = ({ children }) => {
    const [questionToDisplayOntoUI, setQuestionToDisplayOntoUI] = useState([]);
    const globalTriviaStates = [
        {
            name: 'triviaQuestionToDisplayOntoUI',
            state: [questionToDisplayOntoUI, setQuestionToDisplayOntoUI]
        }
    ]

    function getTargetTriviaContextBusinessState(stateName) {
        return globalTriviaStates.find(({ name }) => name === stateName)
    }

    function updateSpecificGlobalTriviaContextBusinessState(targetStateName, newState, updateState) {
        try {
            if (!updateState && !newState) {
                throw new Error("Must provide a 'updateState' function or a 'newState' variable.")
            }

            const _state = globalTriviaStates.find(({ name }) => name === targetStateName)
            const [, setState] = _state;

            if (updateState) {
                setState(prevState => updateState(prevState))
                return;
            }

            setState(newState)
        } catch (error) {
            console.error(`An error has occurred in updating the state of '${targetStateName}.' Error message: ${error}.`)
        }
    };



    return (
        <TriviaBusinessDataContext.Provider value={{
            updateSpecificGlobalTriviaContextBusinessState,
            getTargetTriviaContextBusinessState
        }}>
            {children}
        </TriviaBusinessDataContext.Provider>
    );
};
