import React, { createContext, useState } from 'react';

export const TriviaBusinessDataContext = createContext();

export const TriviaBusinessDataProvider = ({ children }) => {
    const [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI] = useState([]);

    const globalTriviaStates = [
        {
            name: 'questionsToDisplayOntoUI',
            state: [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI]
        }
    ]

    function getTargetTriviaContextBusinessState(stateName) {
        return globalTriviaStates.find(({ name }) => name === stateName)?.state
    }

    function updateSpecificGlobalTriviaContextBusinessState(targetStateName, newState, updateStateHandler) {
        try {
            const _state = getTargetTriviaContextBusinessState(targetStateName);

            if(!_state){
                throw new Error("Couldn't find the target state.");
            }

            if (!updateStateHandler && !newState) {
                throw new Error("Must provide a 'updateState' function or a 'newState' variable.")
            }

            const [, setState] = _state;

            if (updateStateHandler) {
                console.log('using a handler to update target state...')
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
