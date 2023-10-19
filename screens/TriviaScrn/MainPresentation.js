import { View } from 'react-native';
import { mainViewStyleSheet } from './styles'
import React from 'react';
import QuestionCompContainer from './components/Question/Container';

function TriviaScrnMainPresentation() {
    return (
        <View style={{ ...mainViewStyleSheet.mainView }}>
            <QuestionCompContainer />
        </View>
    );
}

export default TriviaScrnMainPresentation;
