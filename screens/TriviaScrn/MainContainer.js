import { useContext, useEffect } from "react";
import TriviaScrnMainPresentation from "./MainPresentation";
import { IS_TESTING } from "../../globalVars";
import axios from "axios";
import { TriviaBusinessDataContext } from "../../providers/TriviaBusinessDataProvider";
import { TriviaViewDataContext } from "../../providers/TriviaViewDataProvider";

const TESTING_QUESTION_CHOOSE_PICS = [
    '../../../assets/testingImgs/marshall.jpg',
    '../../../assets/testingImgs/randymoss.jpg',
    '../../../assets/testingImgs/ap.jpg',
    '../../../assets/testingImgs/owens.jpg',
]
const TEST_QUESTIONS = [
    {
        pictures: TESTING_QUESTION_CHOOSE_PICS,
        isPictureSelectionQ: true,
        txt: "All except for ONE of these NFL veterans never played for the Seahawks. Click on the correct picture.",
        indexOfCorrectAns: 1
    }
]

function TriviaScrnMainContainer() {
    return <TriviaScrnMainPresentation />
}

export default TriviaScrnMainContainer;
