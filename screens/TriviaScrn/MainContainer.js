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
        txt: "All except for ONE of these NFL veterans never played for the Seahawks. Click on the correct picture.",
        indexOfCorrectAns: 1
    }
]

function TriviaScrnMainContainer() {
    const { updateSpecificGlobalTriviaContextBusinessState } = useContext(TriviaBusinessDataContext);
    const { getTargetTriviaViewState } = useContext(TriviaViewDataContext);
    const [, setIsGettingTriviaQuestions] = getTargetTriviaViewState("isGettingTriviaQuestions");

    function getQuerriedSetQuestionsFn(questions) {
        return setQuestions => {
            setQuestions(questions)
            setIsGettingTriviaQuestions(false);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const questions = IS_TESTING ? TEST_QUESTIONS : await axios.get("");

                updateSpecificGlobalTriviaContextBusinessState('triviaQuestionsToDisplayOntoUI', null, getQuerriedSetQuestionsFn(questions), getQuerriedSetQuestionsFn(questions));
            } catch (error) {
                console.error("Failed to get the questions to trivia questions to display onto the DOM. Error message: ", error)
            }
        })();
    }, []);



    return <TriviaScrnMainPresentation />
}

export default TriviaScrnMainContainer;
