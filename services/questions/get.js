import axios from "axios";
import { GET_QUESTIONS_PATH, IS_TESTING, QUESTIONS_API_DOMAIN } from "../../globalVars";
import CustomLocalStorage from "../../globalHelperFns/localStorage";
import uuid from 'react-native-uuid';

const BrandonMarshall = require('../../assets/testingImgs/marshall.jpg')
const RandyMoss = require('../../assets/testingImgs/randymoss.jpg')
const AdrianPeterson = require('../../assets/testingImgs/ap.jpg')
const TerrellOwens = require('../../assets/testingImgs/owens.jpg')
const TESTING_QUESTION_CHOOSE_PICS = [
    { picUrl: BrandonMarshall, choice: 'Brandon Marshall' },
    { picUrl: RandyMoss, choice: 'Randy Moss' },
    { picUrl: AdrianPeterson, choice: 'Adrian Peterson' },
    { picUrl: TerrellOwens, choice: 'Terrell Owens' },
]
const TEST_QUESTIONS = [
    {
        "_id": 1,
        pictures: TESTING_QUESTION_CHOOSE_PICS,
        text: "All except for ONE of these NFL veterans NEVER played for the Seahawks. Select the correct picture.",
        answer: 'Randy Moss',
        explanation: 'Randy Moss played for the Vikings, Patriots, Oakland Raiders, Titans, and the 49ers.'
    },
    {
        "_id": "6998604d-3347-41e0-b34f-45832d50a989",
        "text": "What year did the Seattle Seahawks win their first Super Bowl?",
        "choices": ["2012", "2013", "2014", "2015"],
        "answer": "2014"
    },
    {
        "_id": "7b1bfe76-cb95-4562-ab6e-e18a808fd4d9",
        "text": "When Steve Largent retired, he was the owner of all major career NFL receiving records.",
        "choices": [
            true,
            false
        ],
        "answer": true
    },
]
const customLocalStorage = new CustomLocalStorage();

export async function getTriviaQuestions(
    executeFinallyFnHandler,
    executeErrorHandlerFn,
    handleReqSuccessLogic,
    handleBeforeReqWasSent
) {
    try {
        if (handleBeforeReqWasSent) {
            handleBeforeReqWasSent();
        };

        const getQuestionsApiUrlObj = new URL(`${QUESTIONS_API_DOMAIN}/${GET_QUESTIONS_PATH}`);
        let demoUserId = await customLocalStorage.getData('demoUserId');
        const userId = await customLocalStorage.getData('userId');

        if (userId && demoUserId) {
            customLocalStorage.delete('demoUserId')
        }

        if (userId && !demoUserId) {
            getQuestionsApiUrlObj.searchParams.append('userId', userId);
        } else if (demoUserId) {
            getQuestionsApiUrlObj.searchParams.append('demoUserId', demoUserId);
        } else if (!demoUserId) {
            demoUserId = uuid.v4();
            customLocalStorage.setData('demoUserId', demoUserId)
            getQuestionsApiUrlObj.searchParams.append('demoUserId', demoUserId);
        };

        const response = IS_TESTING ? { status: 200, data: structuredClone(new Array(2).fill(TEST_QUESTIONS).flat()) } : await axios.get(getQuestionsApiUrlObj.href);

        if (response.status !== 200) {
            throw new Error('Failed to get the response from the server.')
        }

        if (!response?.data?.questions || !response?.data?.questions?.length) {
            throw new Error("No response was received from the server.")
        };

        if (handleReqSuccessLogic) {
            handleReqSuccessLogic(response.data.questions)
        }

        const questionIds = response.data.questions.map(({ _id }) => _id);

        console.log('questionIds: ', questionIds);

        return { data: response.data.questions };
    } catch (error) {
        const errMsg = `Failed to get the questions from the server. Error message: ${error}`;

        if (executeErrorHandlerFn) {
            executeErrorHandlerFn()
        }

        return { msg: errMsg };
    } finally {
        if (executeFinallyFnHandler) {
            executeFinallyFnHandler()
        }
    }
}