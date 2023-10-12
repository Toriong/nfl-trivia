import React, { createContext, useState } from 'react';
import { useWindowDimensions } from 'react-native';

export const DimensionsContext = createContext();

const DimensionsProvider = ({ children }) => {
    const dimensionsObj = useWindowDimensions()

    function handleResize(handleDimenionsResize, condtainerNames) {
        condtainerNames.forEach(containerName => { handleDimenionsResize(containerName); })
    };

    return (
        <DimensionsContext.Provider value={{ dimensionsObj, handleResize }}>
            {children}
        </DimensionsContext.Provider>
    );
};

export default DimensionsProvider;
