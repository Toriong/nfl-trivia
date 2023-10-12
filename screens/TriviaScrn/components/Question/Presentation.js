import React, { Suspense, useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import CustomText from '../../../../styles/globalStyleComps';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';
import { IS_TESTING, LETTERS } from '../../../../globalVars';
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
import { DimensionsContext } from '../../../../providers/DimensionsProvider';
import MediaQuery, { useMediaQuery } from "react-responsive";

const BrandonMarshall = require('../../../../assets/testingImgs/marshall.jpg')
const RandyMoss = require('../../../../assets/testingImgs/randymoss.jpg')
const AdrianPeterson = require('../../../../assets/testingImgs/ap.jpg')
const TerrellOwens = require('../../../../assets/testingImgs/owens.jpg')
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
        txt: "All except for ONE of these NFL veterans NEVER played for the Seahawks. Select the correct picture.",
        answer: 'Randy Moss',
        explanation: 'Randy Moss played for the Vikings, Patriots, Oakland Raiders, Titans, and the 49ers.'
    },
    {
        "_id": "6998604d-3347-41e0-b34f-45832d50a989",
        "txt": "What year did the Seattle Seahawks win their first Super Bowl?",
        "choices": ["2012", "2013", "2014", "2015"],
        "answer": "2014"
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

function QuestionsChoicesAndAnswerContainer({ currentIndex = 1 }) {
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
                        height: "100%",
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
    const { txt, answer, choices, pictures, explanation } = question;
    const correctImgUrl = pictures?.length > 1 ? pictures.find(({ choice }) => choice === answer) : null;
    const [willFadeInQuestionChoicesAndAnsUI, setWillFadeInQuestionChoicesAndAnsUI] = useState(true);
    const [willFadeOutQuestionChoicesAndAnsUI, setWillFadeOutQuestionChoicesAndAnsUI] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState({ answer: "", letter: "" });
    const [willFadeOutQuestionTxt, setWillFadeOutQuestionTxt] = useState(false);
    const [willFadeOutExplanationTxt, setWillFadeOutExplanationTxt] = useState(false);
    const [willFadeOutQuestionPromptPictures, setWillFadeOutQuestionPromptPictures] = useState(false)
    const [willRenderCorrectAnsUI, setWillRenderCorrectAnsUI] = useState(false);
    const [willFadeOutCorrectAnsPicture, setWillFadeOutCorrectAnsPicture] = useState(false);
    const [willRenderQuestionUI, setWillRenderQuestionUI] = useState(true);
    const [wasSelectedAnswerCorrect, setWasSelectedAnswerCorrect] = useState(false);
    const [wasSubmitBtnPressed, setWasSubmitBtnPressed] = useState(false);
    const [stylePropForQuestionAndPicLayout, setStylePropForQuestionAndPicLayout] = useState({});
    const [selectedChoice, setSelectedChoice] = useState(null)
    const [resultTxt, setResultTxt] = useState("")
    // make this into a custom hook, BELOW
    const isBelow375PxViewPortWidth = useMediaQuery({ query: "(max-width: 375px)" });
    const isBelow300PxViewPortWidth = useMediaQuery({ query: "(max-width: 300px)" });
    const isBelow575PxViewPortWidth = useMediaQuery({ query: "(max-width: 575px)" });
    // MAKE the above into a custom hook
    let multipleImgsStyle = { width: 165, height: 165 }
    let btnContainerStyle = { marginTop: 20 }
    let questionContainerTxtLayout = { padding: 20 }
    let imageContainerStyle = { gap: 20 }
    let selectedAnswerContainerStyle = { top: 30 }
    let buttonStyle = { marginTop: 40 }
    let selectedAnsContainer = { marginTop: 20 }

    if (isBelow575PxViewPortWidth) {
        questionContainerTxtLayout = {}
        btnContainerStyle = {};
        selectedAnswerContainerStyle = {};
        selectedAnsContainer = { marginTop: 5 }
        buttonStyle = { marginTop: 10 };
        multipleImgsStyle = {
            width: 160,
            height: 160
        }
    }

    if (isBelow375PxViewPortWidth) {
        multipleImgsStyle = {
            width: 145,
            height: 145
            // 125
        }
    }

    if (isBelow300PxViewPortWidth) {
        multipleImgsStyle = {
            width: 115,
            height: 115
        }
        imageContainerStyle = { gap: 10 }
    }

    function handleOnImgPress(answer) {
        setSelectedAnswer(answer);
    }



    function handleOnChoiceBtnPress(answer, letter) {
        setSelectedAnswer({ answer: answer, letter: letter });
    }



    // styles will hold the following: 
    // all of the styles that will be dynamic due to the viewport change in its width
    // have it be a object that is returned



    // BRAIN DUMP: 
    // change the gap between the images as the viewport decrease pertaining to the width of the screen

    // GOAL: change the height of the image to prevent it from breaking onto the next line


    function handleOnSubmitBtnPress() {
        setWasSubmitBtnPressed(true);
        setWasSelectedAnswerCorrect(answer === selectedAnswer.answer)
        setWillFadeOutQuestionPromptPictures(true);
        setWillFadeOutQuestionTxt(true);

        setTimeout(() => {
            setWillRenderQuestionUI(false);
            setTimeout(() => {
                setWillRenderCorrectAnsUI(true);
            }, 250)
        }, 450)
    }


    function handleOnLayout(event) {
        setStylePropForQuestionAndPicLayout({ height: event?.nativeEvent?.layout?.height })
    }

    const [correctAnswerWidthObj, setCorrectAnswerWidthObj] = useState({})

    function handleOnLayoutForChoiceContainer(event) {
        setCorrectAnswerWidthObj({ width: event?.nativeEvent?.width })
    }

    const colorForAnswerShownTxts = wasSubmitBtnPressed ? (wasSelectedAnswerCorrect ? 'green' : 'red') : 'white';

    return (
        <FadeUpAndOut
            dynamicStyles={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            _willFadeIn={[willFadeInQuestionChoicesAndAnsUI, setWillFadeInQuestionChoicesAndAnsUI]}
            willFadeOut={willFadeOutQuestionChoicesAndAnsUI}
        >
            <View
                style={{
                    ...questionContainerTxtLayout,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: "80%"
                }}
            >
                <View
                    style={{
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...stylePropForQuestionAndPicLayout
                    }}
                    onLayout={handleOnLayout}
                >
                    {willRenderQuestionUI &&
                        <>
                            <FadeUpAndOut
                                dynamicStyles={{
                                    heigth: "100%",
                                    width: "100%",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                _willFadeIn={[true, () => { }]}
                                willFadeOut={willFadeOutQuestionPromptPictures}
                            >
                                {pictures?.length && (
                                    <View
                                        style={{
                                            width: "100%",
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <View
                                            style={{
                                                ...imageContainerStyle,
                                                width: "100%",
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            {(pictures.length > 1) ?
                                                pictures.map((pic, index) => {
                                                    const props = IS_TESTING ? { source: pic.picUrl } : { src: pic.picUrl };

                                                    return (
                                                        <Button
                                                            key={index}
                                                            handleOnPress={() => handleOnImgPress(pic.choice)}
                                                        >
                                                            <Image
                                                                style={{
                                                                    ...multipleImgsStyle,
                                                                    borderRadius: 20
                                                                }}
                                                                {...props}
                                                            />
                                                        </Button>
                                                    )
                                                })
                                                :
                                                <Image
                                                    style={{ ...multipleImgsStyle, borderRadius: 20 }}
                                                    src={pictures[0].picUrl}
                                                />
                                            }
                                        </View>
                                    </View>
                                )}
                                {choices?.length && (
                                    <View
                                        style={{
                                            width: "100%",
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: "75%",
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: 20,
                                                paddingStart: 10,
                                                paddingEnd: 10,
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                bottom: "5%"
                                            }}
                                        >
                                            {choices.map((choiceTxtStr, index) => {
                                                const letter = ["A", "B", "C", "D"][index];
                                                let answerBackgroundColor = SEAHAWKS_COLORS.home["3rd"]

                                                if ((selectedAnswer.letter === letter) && !wasSubmitBtnPressed) {
                                                    answerBackgroundColor = SEAHAWKS_COLORS.home["2nd"]
                                                }

                                                if (wasSubmitBtnPressed) {
                                                    answerBackgroundColor = wasSelectedAnswerCorrect ? 'green' : 'red';
                                                }
                                                // const answerBackgroundColor = selectedAnswer.letter === letter ? 'green'

                                                return (
                                                    <View
                                                        key={letter}
                                                        style={{
                                                            width: "85%",
                                                            height: 50,
                                                            backgroundColor: answerBackgroundColor,
                                                            borderRadius: 10,
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            paddingLeft: 10,
                                                            paddingRight: 10
                                                        }}
                                                    >
                                                        <Button
                                                            dynamicStyles={{ width: "100%" }}
                                                            handleOnPress={_ => handleOnChoiceBtnPress(choiceTxtStr, letter)}
                                                        >
                                                            <PTxt style={{ height: "100%", width: "100%", textAlign: 'center' }}>{`${letter}. ${choiceTxtStr}`}</PTxt>
                                                        </Button>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                )}
                            </FadeUpAndOut>
                            <FadeUpAndOut
                                _willFadeIn={[true, () => { }]}
                                dynamicStyles={{
                                    width: "100%",
                                    height: "26%",
                                    marginTop: "3%"
                                }}
                                willFadeOut={willFadeOutQuestionTxt}
                            >
                                <View
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <PTxt style={{ paddingStart: 5, paddingEnd: 5, color: 'white', textAlign: 'center' }}>{txt}</PTxt>
                                </View>
                            </FadeUpAndOut>
                        </>
                    }
                    {willRenderCorrectAnsUI &&
                        <>
                            <FadeUpAndOut
                                dynamicStyles={{
                                    heigth: 20,
                                    width: "100%",
                                    width: "100%",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    bottom: 10
                                }}
                                _willFadeIn={[true, () => { }]}
                                willFadeOut={willFadeOutCorrectAnsPicture}
                            >
                                <PTxt txtColor='green'>Correct Answer: </PTxt>
                                {pictures?.length
                                    ?
                                    <PTxt txtColor='green'>
                                        {answer}
                                    </PTxt>
                                    :
                                    <View
                                        style={{
                                            width: "100%",
                                            height: 50,
                                            backgroundColor: 'green',
                                            borderRadius: 10,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            top: 15
                                        }}
                                    >
                                        <PTxt>
                                            
                                            {`${LETTERS[choices.findIndex(choiceTxt => choiceTxt === answer)]}. ${answer}`}
                                        </PTxt>
                                    </View>
                                }
                            </FadeUpAndOut>
                            {correctImgUrl && (
                                <FadeUpAndOut
                                    dynamicStyles={{
                                        heigth: "100%",
                                        width: "100%",
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                    _willFadeIn={[true, () => { }]}
                                    willFadeOut={willFadeOutCorrectAnsPicture}
                                >
                                    <View
                                        style={{
                                            borderRadius: 20,
                                            width: "100%",
                                            height: "100%",
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: 185,
                                                height: 185,
                                                borderRadius: 20
                                            }}
                                            source={correctImgUrl}
                                        />
                                    </View>
                                </FadeUpAndOut>
                            )}
                            <FadeUpAndOut
                                _willFadeIn={[true, () => { }]}
                                dynamicStyles={{
                                    width: "100%",
                                    height: "26%",
                                    marginBottom: "10%"
                                }}
                                willFadeOut={willFadeOutExplanationTxt}
                            >
                                <View
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        marginTop: "5%"
                                    }}
                                >
                                    <PTxt style={{ color: 'white', textAlign: 'center', paddingStart: 5, paddingEnd: 5 }} >{explanation}</PTxt>
                                </View>
                            </FadeUpAndOut>
                            <FadeUpAndOut
                                _willFadeIn={[true, () => { }]}
                                dynamicStyles={{
                                    width: "100%",
                                    marginBottom: "15%"
                                }}
                                willFadeOut={willFadeOutExplanationTxt}
                            >
                                <View
                                    style={{
                                        width: "100%",
                                        height: 80,
                                    }}
                                >

                                    <PTxt
                                        txtColor={colorForAnswerShownTxts}
                                        style={{ color: 'white', textAlign: 'center', paddingStart: 5, paddingEnd: 5 }}
                                    >
                                        {wasSelectedAnswerCorrect ? "Correct 👍" : "Incorrect 👎"}
                                    </PTxt>
                                </View>
                            </FadeUpAndOut>
                        </>
                    }
                </View>
                <View
                    style={{
                        width: "100%",
                        height: 'fit-content',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ...selectedAnswerContainerStyle,
                    }}
                >
                    <View>
                        <PTxt txtColor={colorForAnswerShownTxts}>Answer: </PTxt>
                    </View>
                    <View style={{ ...selectedAnsContainer, borderBottomWidth: .5, borderColor: colorForAnswerShownTxts, minWidth: 200, minHeight: 30 }}>
                        <PTxt style={{ fontStyle: 'italic', textAlign: 'center', top: 5 }} txtColor={colorForAnswerShownTxts}>{pictures ? selectedAnswer.answer : selectedAnswer.letter}</PTxt>
                    </View>
                </View>
                <View style={{ ...btnContainerStyle, width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        isDisabled={selectedAnswer.answer === ""}
                        dynamicStyles={{
                            opacity: selectedAnswer.answer === "" ? .3 : 1,
                            backgroundColor: '#69BE28',
                            padding: 10,
                            borderRadius: 5,
                            ...buttonStyle
                        }}
                        handleOnPress={handleOnSubmitBtnPress}
                    >
                        <PTxt>Submit</PTxt>
                    </Button>
                </View>
            </View>
        </FadeUpAndOut >
    )
}

function QuestionCompPresentation() {
    const { getTargetTriviaContextBusinessState } = useContext(TriviaBusinessDataContext);

    return (
        <View style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* put the timer here */}
            <QuestionsChoicesAndAnswerContainer />


        </View>
    );
};


export default QuestionCompPresentation;
