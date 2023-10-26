import React, { createContext, useState } from 'react';

export const TriviaBusinessDataContext = createContext();

export const TriviaBusinessDataProvider = ({ children }) => {
    const _questionsToDisplayOntoUI = useState([]);
    const _willGetQuestionsFromServer = useState(false);
   
    return (
        <TriviaBusinessDataContext.Provider 
        value={{ 
            _questionsToDisplayOntoUI,
            _willGetQuestionsFromServer 
        }}
        >
            {children}
        </TriviaBusinessDataContext.Provider>
    );
};
