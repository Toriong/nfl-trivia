import React, { createContext, useState } from 'react';

export const TriviaContext = createContext();

export const TriviaProvider = ({ children }) => {
    const [questionToDisplayOntoUI, setQuestionToDisplayOntoUI] = useState([]);
    const globalTriviaStates = [
        {
            name: 'triviaQuestionToDisplayOntoUI',
            state: [questionToDisplayOntoUI, setQuestionToDisplayOntoUI]
        }
    ]
    
    function updateSpecificGlobalTriviaContextState(targetStateName, newState, updateState){
        try {
            if(!updateState && !newState){
                throw new Error("Must provide a 'updateState' function or a 'newState' variable.")
            }

            const _state = globalTriviaStates.find(({ name }) => name === targetStateName) 
            const [, setState] = _state;
            
            if(updateState){
                setState(prevState => updateState(prevState))
                return;
            }

            setState(newState)
        } catch(error){
            console.error(`An error has occurred in updating the state of '${targetStateName}.' Error message: ${error}.`)
        }
    };

    

    return (
        <TriviaContext.Provider value={{ updateSpecificGlobalTriviaContextState }}>
            {children}
        </TriviaContext.Provider>
    );
};
