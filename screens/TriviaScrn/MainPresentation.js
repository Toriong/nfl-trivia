import { View } from 'react-native';
import { mainViewStyleSheet } from './styles'
import React from 'react';
import QuestionCompContainer from './components/Question/Container';

// GOAL: the view will hold the following: 
// the section that will show the question and the picture, a question will have the following format: 

// TYPE 1:
// -picture first 
// -the question itself
// -the choices
// -the user's selection

// TYPE 2: 
// -four pictures that are selectable
// -and a question
// -the picture that was selected

// sub-components to create: 
// -Question
//  -can have a picture
//  -can have a question mark icon, if the user is guessing a number
// -Choices
// -Answer
//  -the answer that was chosen by the user will display in this component

// The Question component will have the following:
// CASE #1: the selection of picture: 
// display four pictures, have them be selectable
// CASE #2: just a picture and text: 
// display the picture, the question below the question
// CASE #3: the user needs to answer with a number
// display a question mark icon to the user



// TESTING QUESTION for four question selection: 
// Which one of these FOUR NFL VETERANS never played for the Seahawks: 
// AP 
// Terrel Owens
// Brandon Marshall 
// Randy Moss

function TriviaScrnMainPresentation() {


    return (
        <View style={{ ...mainViewStyleSheet.mainView }}>
            <QuestionCompContainer />
        </View>
    );
}

export default TriviaScrnMainPresentation;
