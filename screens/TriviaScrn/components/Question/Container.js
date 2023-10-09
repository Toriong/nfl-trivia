import React from 'react';
import QuestionCompPresentation from './Presentation'

// get tHE FOLLOWING players: 
// terrell owens
// AP 
// brandom marshall 
import React, { useState } from 'react';
import QuestionCompPresentation from './Presentation'
import { IS_TESTING } from '../../../../globalVars.js'

const TESTING_QUESTION_CHOOSE_PICS = [
    '../../../assets/testingImgs/randymoss.jpg',
    '../../../assets/testingImgs/marshall.jpg',
    '../../../assets/testingImgs/ap.jpg',
    '../../../assets/testingImgs/owens.jpg',
]

// the question state will hold the following: 
// the question text 

function QuestionCompContainer() {
    

    return <QuestionCompPresentation question />;
};

export default QuestionCompContainer;
