import React, { Suspense, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
import { HeadingTxt, PTxt } from '../../../../globalComponents/customTxts';
import FadeUpAndOut from '../../../../animations/FadeUpAndOut';
import { SEAHAWKS_COLORS, GLOBAL_ELEMENT_SHADOW_STYLES, CENTER_DEFAULT } from '../../../../styles/globalStylesVars';
import { Button } from '../../../../globalComponents/buttons';

const BrandonMarshall = require('../../../../assets/testingImgs/marshall.jpg')
const RandyMoss = require('../../../../assets/testingImgs/randymoss.jpg')
const AdrianPeterson = require('../../../../assets/testingImgs/ap.jpg')
const TerrellOwens = require('../../../../assets/testingImgs/owens.jpg')
const TESTING_QUESTION_CHOOSE_PICS = [
    { picUrl: BrandonMarshall, name: 'Brandom Marshall' },
    { picUrl: RandyMoss, name: 'Randy Moss' },
    { picUrl: AdrianPeterson, name: 'Adrian Peterson' },
    { picUrl: TerrellOwens, name: 'Terrell Owens' },
]
const TEST_QUESTIONS = [
    {
        pictures: TESTING_QUESTION_CHOOSE_PICS,
        txt: "All except for ONE of these NFL veterans NEVER played for the Seahawks. Select the correct picture.",
        answer: 'Randy Moss',
        explanation: 'Randy Moss played for the Vikings, Patriots, Oakland Raiders, Titans, and the 49ers.'
    }
]


async function getQuestions(apiUrl) {
    try {
        const response = IS_TESTING ? { status: 200, data: TEST_QUESTIONS } : await axios.get(apiUrl);

        if (IS_TESTING) {

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
                dynamicStyles={{ height: "100%" }}
                _willFadeIn={[willFadePresentationIn, setWillFadePresentationIn]}
                willFadeOut={willFadePresentationOut}
            >
                <View
                    style={{
                        display: 'flex',
                        paddingTop: 20,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View style={{
                        height: "50%",
                        borderRadius: 20,
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                        <View
                            style={{ width: "100%", paddingBottom: "25%" }}
                        >
                            <HeadingTxt
                                fontSize={35}
                                style={{
                                    color: 'white',
                                    width: "100%",
                                    textAlign: 'center'
                                }}
                            >
                                Loading...
                            </HeadingTxt>
                            <View
                                style={{
                                    top: 50,
                                    width: "100%"
                                }}
                            >
                                <ActivityIndicator
                                    size='large'
                                    color="#A1B0FD"
                                    style={{
                                        transform: [{ scaleX: 2 }, { scaleY: 2 }]
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            height: "45%",
                            ...CENTER_DEFAULT.center
                        }}
                    >
                        <ActivityIndicator
                            size='large'
                            color="#A1B0FD"
                            style={{
                                transform: [{ scaleX: 2 }, { scaleY: 2 }]
                            }}
                        />
                    </View>
                </View>
            </FadeUpAndOut>
        )
    }

    const currentQuestion = questions[currentIndex] ?? {};

    if (!currentQuestion) {
        console.log('what is up')
        // tell the user that the program is unable to show the pictures to the user
        return <PTxt>An error has occurred in displaying the question. Please refresh the app and try again.</PTxt>;
    }




    return <QuestionChoicesAndAnswerUI question={currentQuestion} />
}

function QuestionChoicesAndAnswerUI({ question }) {
    const { txt, answer, choice, pictures } = question;
    const [willFadeInQuestionChoicesAndAnsUI, setWillFadeInQuestionChoicesAndAnsUI] = useState(true);
    const [willFadeOutQuestionChoicesAndAnsUI, setWillFadeOutQuestionChoicesAndAnsUI] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [willFadeOutPictures, setWillFadeOutPictures] = useState(false)

    function handleOnPress(answer) {
        setSelectedAnswer(answer);
    }

    function handleOnSubmitBtnPress(){

    }

    return (
        <FadeUpAndOut
            dynamicStyles={{ height: "100%", top: 20 }}
            _willFadeIn={[willFadeInQuestionChoicesAndAnsUI, setWillFadeInQuestionChoicesAndAnsUI]}
            willFadeOut={willFadeOutQuestionChoicesAndAnsUI}
        >
            <View
                style={{
                    display: 'flex',
                    paddingTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <FadeUpAndOut
                    dynamicStyles={{
                        heigth: "100%",
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    _willFadeIn={[true, () => { }]}
                    willFadeOut={willFadeOutPictures}
                >
                    <View style={{
                        height: "50%",
                        borderRadius: 20,
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                        <View
                            style={{
                                width: "100%",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10,
                                flexDirection: 'row',
                                flexWrap: 'wrap'
                            }}
                        >
                            {(pictures.length > 1) ?
                                pictures.map(pic => {
                                    const props = IS_TESTING ? { source: pic.picUrl } : { src: pic.picUrl };

                                    return (
                                        <Button handleOnPress={() => handleOnPress(pic.name)}>
                                            <Image
                                                style={{
                                                    height: 165,
                                                    width: 165,
                                                    borderRadius: 20
                                                }}
                                                {...props}
                                            />
                                        </Button>
                                    )
                                })
                                :
                                <Image
                                    style={{ height: 165, width: 165, borderRadius: 20 }}
                                    src={pictures[0].picUrl}
                                />
                            }
                        </View>
                    </View>
                </FadeUpAndOut>
                <View
                    style={{
                        width: "100%",
                        height: "26%",
                        ...CENTER_DEFAULT.center
                    }}
                >
                    <PTxt style={{ color: 'white', textAlign: 'center' }} >{txt}</PTxt>
                </View>
                {pictures.length > 1 && (
                    <View>
                        {/* conditional render this view only if the question is multiple choice. */}
                    </View>
                )}
                <View style={{ width: "100%", height: 'fit-content', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PTxt>Answer: </PTxt>
                </View>
                <View style={{ borderBottomWidth: .5, borderColor: 'white', minWidth: 200, minHeight: 30 }}>
                    <PTxt style={{ fontStyle: 'italic', textAlign: 'center', marginTop: 5 }}>{selectedAnswer}</PTxt>
                </View>
                <View style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Button
                        dynamicStyles={{
                            top: 20,
                            backgroundColor: '#69BE28',
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 5
                        }}
                        handleOnClick={handleOnSubmitBtnPress}
                    >
                        <PTxt>Submit</PTxt>
                    </Button>
                </View>
            </View>
        </FadeUpAndOut>
    )
}

function QuestionCompPresentation() {
    const { getTargetTriviaContextBusinessState } = useContext(TriviaBusinessDataContext);

    return (
        <View>
            {/* put the timer here */}
            <QuestionsChoicesAndAnswerContainer />


        </View>
    );
};


export default QuestionCompPresentation;
