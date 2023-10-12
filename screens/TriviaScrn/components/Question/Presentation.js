import React, { Suspense, useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
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
import { DimensionsContext } from '../../../../providers/DimensionsProvider';

const BrandonMarshall = require('../../../../assets/testingImgs/marshall.jpg')
const RandyMoss = require('../../../../assets/testingImgs/randymoss.jpg')
const AdrianPeterson = require('../../../../assets/testingImgs/ap.jpg')
const TerrellOwens = require('../../../../assets/testingImgs/owens.jpg')
const TESTING_QUESTION_CHOOSE_PICS = [
    { picUrl: BrandonMarshall, name: 'Brandon Marshall' },
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

const MULTIPLE_IMGS_DIMENSIONS_DEFAULT = {
    height: 165,
    width: 165
};
const MUTIPLE_IMGS_DIMENSIONS_MED = {
    height: 145,
    width: 145
}

function QuestionChoicesAndAnswerUI({ question }) {
    const { dimensionsObj } = useContext(DimensionsContext);
    const { txt, answer, choice, pictures, explanation } = question;
    const [willFadeInQuestionChoicesAndAnsUI, setWillFadeInQuestionChoicesAndAnsUI] = useState(true);
    const [willFadeOutQuestionChoicesAndAnsUI, setWillFadeOutQuestionChoicesAndAnsUI] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [willFadeOutQuestionTxt, setWillFadeOutuestionTxt] = useState(false);
    const [willFadeOutPictures, setWillFadeOutPictures] = useState(false)
    const [willRenderCorrectAnsUI, setWillRenderCorrectAnsUI] = useState(false);
    const [willRenderQuestionUI, setWillRenderQuestionUI] = useState(true);
    const [stylePropForQuestionAndPicLayout, setStylePropForQuestionAndPicLayout] = useState({});

    function handleOnImgPress(answer) {
        setSelectedAnswer(answer);
    }

    // BRAIN DUMP: 
    // create a function
    // create an array that will hold objects, these objects will be the values that will be inserted for the style prop of a container
    // when the dimensions changes, execute the function, it will update each of the objects only if it meets a specific length of the viewport width
    // each object will have the following form: { name: the name of the container, style: the object that contains the styles }
    let styleObjs = [{ name: 'multipleImgs', style: { ...MULTIPLE_IMGS_DIMENSIONS_DEFAULT } }]

    function updateStylesObjs(viewPortWidth, name) {
        if ((viewPortWidth <= 375) && (name === 'multipleImgs')) {
            styleObjs[0].style = { ...MUTIPLE_IMGS_DIMENSIONS_MED }
        }
    }

    // styles will hold the following: 
    // all of the styles that will be dynamic due to the viewport change in its width
    // have it be a object that is returned


    useMemo(() => { 
        styleObjs.forEach(styleObj => {
            updateStylesObjs(dimensionsObj.width, styleObj.name)
        })
     }, [dimensionsObj.width]);

     useEffect(() => {
        console.log("styleObjs: ", styleObjs);
     })

        // BRAIN DUMP: 
        // change the gap between the images as the viewport decrease pertaining to the width of the screen

        // GOAL: change the height of the image to prevent it from breaking onto the next line

        function handleOnSubmitBtnPress() {

            // GOAL: when the user clicks on the submit button, have the following to occur: 

            // GOAL #1: SHOW THE CORRECT IMAGE
            // fade out the answer ui
            // fade in the correct image ui

            // GOAL #2: Fade in the answer UI. Have the explanation text be faded onto the DOM. 

            // CASE: the answer which the user selected was incorrect. 
            // HAVE THE FOLLOWING TO OCCUR: 
            // fade out question text 
            // fade out the pictures

            // fade in the correct picture 
            // fade in explanation
            // change the answer text to red

            if (answer !== selectedAnswer) {

            }

            setWillFadeOutPictures(true);
            setWillFadeOutuestionTxt(true);

            setTimeout(() => {
                setWillRenderQuestionUI(false);
                setTimeout(() => {
                    setWillRenderCorrectAnsUI(true);
                }, 250)
            }, 450)

            // within a setTimeout, after a quarter of a second, take off of the DOM the pictures and question
            // text ui

            // within a setTimeout, after a half of a second, show the following: 
            // the correct answer ui
            // the explanation for the correct answer



            // GOAL #3: check if what the user selected is correct
            // CASE: what the user selected was incorrect, return false 
            // compare what the user selected with the correct answer
            // get the correct answer
            // get the choice which the user selected
            // FOR THE END GOAL ABOVE, return TRUE
        }

    function handleOnLayout(event) {
        setStylePropForQuestionAndPicLayout({ height: event?.nativeEvent?.layout?.height })
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
                    padding: 20,
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
                        ...stylePropForQuestionAndPicLayout,
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
                                willFadeOut={willFadeOutPictures}
                            >
                                <View
                                    style={{
                                        borderWidth: 1,
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
                                            pictures.map((pic, index) => {
                                                const props = IS_TESTING ? { source: pic.picUrl } : { src: pic.picUrl };

                                                return (
                                                    <Button
                                                        key={index}
                                                        handleOnPress={() => handleOnImgPress(pic.name)}
                                                    >
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
                            <FadeUpAndOut
                                _willFadeIn={[true, () => { }]}
                                dynamicStyles={{
                                    width: "100%",
                                    height: "26%",
                                    ...CENTER_DEFAULT.center,
                                }}
                                willFadeOut={willFadeOutQuestionTxt}
                            >
                                <View
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        ...CENTER_DEFAULT.center
                                    }}
                                >
                                    <PTxt style={{ color: 'white', textAlign: 'center' }} >{txt}</PTxt>
                                </View>
                            </FadeUpAndOut>
                        </>
                    }
                    {willRenderCorrectAnsUI &&
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
                                willFadeOut={willFadeOutPictures}
                            >
                                <View style={{
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
                                        {/* GOAL: show the correct image here. */}
                                        <Image
                                            style={{ height: 165, width: 165, borderRadius: 20 }}
                                            src={pictures[0].picUrl}
                                        />
                                    </View>
                                </View>
                            </FadeUpAndOut>
                            <FadeUpAndOut
                                _willFadeIn={[true, () => { }]}
                                dynamicStyles={{
                                    width: "100%",
                                    height: "26%",
                                    ...CENTER_DEFAULT.center,
                                }}
                                willFadeOut={willFadeOutQuestionTxt}
                            >
                                <View
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        ...CENTER_DEFAULT.center
                                    }}
                                >
                                    <PTxt style={{ color: 'white', textAlign: 'center' }} >{txt}</PTxt>
                                </View>
                            </FadeUpAndOut>
                        </>
                    }
                </View>
                {pictures.length > 1 && (
                    <View>
                        {/* conditional render this view only if the question is multiple choice. */}
                    </View>
                )}
                <View
                    style={{
                        width: "100%",
                        height: 'fit-content',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <PTxt>Answer: </PTxt>
                </View>
                <View style={{ borderBottomWidth: .5, borderColor: 'white', minWidth: 200, minHeight: 30 }}>
                    <PTxt style={{ fontStyle: 'italic', textAlign: 'center', marginTop: 5 }}>{selectedAnswer}</PTxt>
                </View>
                <View style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Button
                        isDisabled={selectedAnswer === ""}
                        dynamicStyles={{
                            top: 20,
                            opacity: selectedAnswer === "" ? .3 : 1,
                            backgroundColor: '#69BE28',
                            padding: 10,
                            borderRadius: 5
                        }}
                        handleOnPress={handleOnSubmitBtnPress}
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
        <View style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* put the timer here */}
            <QuestionsChoicesAndAnswerContainer />


        </View>
    );
};


export default QuestionCompPresentation;
