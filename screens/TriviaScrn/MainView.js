import React from 'react';
import { View } from 'react-native';
import { mainViewStyleSheet } from './styles'

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
// -PictureForQuestion
// -Choices
// -Answer
//  -the answer that was chosen by the user will display in this component

function MainView(){
    

    return (
        <View style={{ ...mainViewStyleSheet.mainView }}>

        </View>
    );
}

export default MainView;
