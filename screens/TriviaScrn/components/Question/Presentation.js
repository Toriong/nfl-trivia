import React, { Suspense, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomText from '../../../../styles/globalStyleComps';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';
import { IS_TESTING } from '../../../../globalVars';
import axios from 'axios';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { delay } from '../../../../globalTestingFns/globalTestingFns';

// brain dump notes: 
// create the question section for the display of the question, choices, and answer
// wrap the above in a suspense component

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


async function getQuestions(apiUrl) {
    try {
        const response = IS_TESTING ? { status: 200, data: TEST_QUESTIONS } : await axios.get(apiUrl);

        if(IS_TESTING){
            const timeBeforeLoop = new Date().getTime();
            let loopTimeMs = 0;
            while(loopTimeMs <= 20){
                console.log('looping...')
                console.log('loopTimeMs: ', loopTimeMs)
                loopTimeMs = new Date().getTime() - timeBeforeLoop;
            }
            console.log('will execute loop...')
        }

        if (response.status !== 200) {
            throw new Error('Failed to get the response from the server.')
        }

        if (!response.data || !response?.data?.length) {
            throw new Error("No response was received from the server.")
        }

        return response.data;
    } catch (error) {
        console.error('Failed to get the questions from the server...')

        return null;
    }
}

function QuestionsChoicesAndAnswerContainer({ currentIndex = 0 }) {
    const { isFetching } = useQuery({ queryFn: getQuestions, queryKey: ['questionsQueryKey'] })

    if (isFetching) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View>
            <Text>hey there</Text>
        </View>
    )
}

function QuestionCompPresentation() {
    const { getTargetTriviaContextBusinessState } = useContext(TriviaBusinessDataContext);

    return (
        <View style={styles.container}>
            {/* use suspense here, if still getting the questions, then present the loading ui state */}
            {/* wrap using suspense */}
            <Suspense fallback={<Text>Loading...</Text>}>
                <QuestionsChoicesAndAnswerContainer />
            </Suspense>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default QuestionCompPresentation;
