import axios from "axios";
import { IS_TESTING } from "../../globalVars";

const BrandonMarshall = require('../../assets/testingImgs/marshall.jpg')
const RandyMoss = require('../../assets/testingImgs/randymoss.jpg')
const AdrianPeterson = require('../../assets/testingImgs/ap.jpg')
const TerrellOwens = require('../../assets/testingImgs/owens.jpg')
const QUESTIONS_API_URL = 'http://localhost:19006/';
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
    }
]

export async function getTriviaQuestions(
    userId,
    executeFinallyFnHandler,
    executeErrorHandlerFn,
    handleReqSuccessLogic,
    handleBeforeReqWasSent
) {
    try {
        console.log('Getting questions from api...')
        if (handleBeforeReqWasSent) {
            handleBeforeReqWasSent();
        }

        const url = new URL(QUESTIONS_API_URL)
        url.searchParams.append('userId', userId)
        const response = IS_TESTING ? { status: 200, data: structuredClone(new Array(2).fill(TEST_QUESTIONS).flat()) } : await axios.get(QUESTIONS_API_URL);

        if (IS_TESTING) {

        }

        if (response.status !== 200) {
            throw new Error('Failed to get the response from the server.')
        }

        if (!response.data || !response?.data?.length) {
            throw new Error("No response was received from the server.")
        }

        if (handleReqSuccessLogic) {
            handleReqSuccessLogic(response.data)
        }

        console.log('Questions received yolo: ', response.data)

        return response.data;
    } catch (error) {
        console.error('Failed to get the questions from the server. Error message: ', error)

        if (executeErrorHandlerFn) {
            executeErrorHandlerFn()
        }

        return null;
    } finally {
        if (executeFinallyFnHandler) {
            executeFinallyFnHandler()
        }
    }
}