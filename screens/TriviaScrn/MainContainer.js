import { useContext, useEffect } from "react";
import TriviaScrnMainPresentation from "./MainPresentation";
import { IS_TESTING } from "../../globalVars";
import axios from "axios";
import { TriviaContext } from "../../providers/TriviaProvider";

// have the question that was selected to display to the user resides in this 
// comp

const TESTING_QUESTION_CHOOSE_PICS = [
    '../../../assets/testingImgs/marshall.jpg',
    '../../../assets/testingImgs/randymoss.jpg',
    '../../../assets/testingImgs/ap.jpg',
    '../../../assets/testingImgs/owens.jpg',
]
const TEST_QUESTIONS = [
    {
        pictures: TESTING_QUESTION_CHOOSE_PICS,
        txt: "All except for ONE of these NFL veterans never played for the Seahawks. Click on the correct picture.",
        indexOfCorrectAns: 1
    }
]

function TriviaScrnMainContainer() {
    const { updateSpecificGlobalTriviaContextState } = useContext(TriviaContext)
    // brain dump notes:
    // select which question to display in this container
    // the selected question will be a global state using Context

    // within a useEffect, get the questions from the database to display to the target user: 

    useEffect(() => {
        (async () => {
            const questions = IS_TESTING ? TEST_QUESTIONS : await axios.get("API_GET_QUESTIONS");
            
            updateSpecificGlobalTriviaContextState('triviaQuestionToDisplayOntoUI', questions)
        })();
    }, []);



    return <TriviaScrnMainPresentation />
}

export default TriviaScrnMainContainer;
