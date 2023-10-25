import { View } from 'react-native';
import { mainViewStyleSheet } from './styles'
import React from 'react';
import QuestionCompContainer from './components/Question/Container';
import Timer from './components/Timer';

function TriviaScrnMainPresentation() {
    return (
        <View style={{ ...mainViewStyleSheet.mainView, position: 'relative' }}>
            <Timer />
            <QuestionCompContainer />
        </View>
    );
}

export default TriviaScrnMainPresentation;
