import React, { createContext, useState } from 'react';

export const TriviaBusinessDataContext = createContext();

export const TriviaBusinessDataProvider = ({ children }) => {
    const [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI] = useState([]);
    const globalTriviaStates = [
        {
            name: 'triviaQuestionsToDisplayOntoUI',
            state: [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI]
        }
    ]

    function getTargetTriviaContextBusinessState(stateName) {
        return globalTriviaStates.find(({ name }) => name === stateName)?.state
    }

    function updateSpecificGlobalTriviaContextBusinessState(targetStateName, newState, updateStateHandler) {
        try {
            if (!updateStateHandler && !newState) {
                throw new Error("Must provide a 'updateState' function or a 'newState' variable.")
            }

            const _state = getTargetTriviaContextBusinessState(targetStateName)
            const [, setState] = _state;

            if (updateStateHandler) {
                updateStateHandler(setState)
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
