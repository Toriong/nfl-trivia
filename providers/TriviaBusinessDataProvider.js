import React, { createContext, useState } from 'react';

export const TriviaBusinessDataContext = createContext();

export const TriviaBusinessDataProvider = ({ children }) => {
    const _questionsToDisplayOntoUI = useState([]);
   
    return (
        <TriviaBusinessDataContext.Provider value={{ _questionsToDisplayOntoUI }}>
            {children}
        </TriviaBusinessDataContext.Provider>
    );
};
