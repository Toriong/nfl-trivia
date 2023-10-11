import React, { Suspense, useContext, useEffect, useState } from 'react';
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
import styles from './styles';
import { ActivityIndicator } from 'react-native';
import { HeadingTxt } from '../../../../globalComponents/customTxts';
import FadeUpAndOut from '../../../../animations/FadeUpAndOut';

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

        if (IS_TESTING) {
            const timeBeforeLoop = new Date().getTime();
            let loopTimeMs = 0;
            while (loopTimeMs <= 20) {
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
    const { data: questions } = useQuery({ queryFn: () => getQuestions(), queryKey: ['questionsQueryKey'] })
    const [willFadePresentationIn, setWillFadePresentationIn] = useState(true);
    const [willShowLoadingUI, setWillShowLoadingUI] = useState(true);
    const [willFadePresentationOut, setWillFadePresentationOut] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setWillFadePresentationOut(true);
            setTimeout(() => {
                setWillShowLoadingUI(false);
            }, 400)
        }, 1000)
    }, [])

    if (willShowLoadingUI) {
        return (
            <FadeUpAndOut
                dynamicStyles={{ top: 20 }}
                _willFadeIn={[willFadePresentationIn, setWillFadePresentationIn]}
                willFadeOut={willFadePresentationOut}
            >
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ height: "85%", backgroundColor: 'pink', width: "100%", display: 'flex',  }}>
                        <View style={{ width: "100%" }}>
                            <HeadingTxt fontSize={35} style={{ color: 'white', width: "100%", textAlign: 'center' }}>Loading...</HeadingTxt>
                        </View>
                        <View style={{ top: 50, width: "100%" }}>
                            <ActivityIndicator size='large' color="#A1B0FD" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }} />
                        </View>
                    </View>
                </View>
            </FadeUpAndOut>
        )
    }

    const { txt, pictures } = questions[currentIndex] ?? {};

    if(!txt || !pictures){
        // tell the user that the program is unable to show the pictures to the user
        return null;
    }


    return (
        <View>
            <Text>Questions will be displayed here</Text>
        </View>
    )
}

function QuestionCompPresentation() {
    const { getTargetTriviaContextBusinessState } = useContext(TriviaBusinessDataContext);

    return (
        <View>
            {/* use suspense here, if still getting the questions, then present the loading ui state */}
            {/* wrap using suspense */}
            <QuestionsChoicesAndAnswerContainer />


        </View>
    );
};


export default QuestionCompPresentation;
