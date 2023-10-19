import React, { Suspense, useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import CustomText from '../../../../styles/globalStyleComps';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';
import { IS_TESTING, MULTIPLE_CHOICE_LETTERS } from '../../../../globalVars';
import axios from 'axios';
import {
    useQuery,
} from '@tanstack/react-query'
import styles from './styles';
import { ActivityIndicator } from 'react-native';
import { HeadingTxt, PTxt } from '../../../../globalComponents/customTxts';
import FadeUpAndOut from '../../../../animations/FadeUpAndOut';
import { SEAHAWKS_COLORS, GLOBAL_ELEMENT_SHADOW_STYLES, CENTER_DEFAULT } from '../../../../styles/globalStylesVars';
import { Button } from '../../../../globalComponents/buttons';
import { useMediaQuery } from "react-responsive";
import { useNavigation } from '@react-navigation/native';
import { TriviaViewDataContext } from '../../../../providers/TriviaViewDataProvider';


function TriviaScreenLoadingPresentation({ _willFadeLoadingQuestionsIn, willFadeOutLoadingQuestionsLayout }) {
    const [willFadeLoadingQuestionsIn, setWillFadeLoadingQuestionsIn] = _willFadeLoadingQuestionsIn;

    return (
        <FadeUpAndOut
            dynamicStyles={{ height: "100%" }}
            _willFadeIn={[willFadeLoadingQuestionsIn, setWillFadeLoadingQuestionsIn]}
            willFadeOut={willFadeOutLoadingQuestionsLayout}
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

function QuestionsChoicesAndAnswerContainer({
    questions,
    _willShowLoadingUI,
    _willPresentErrorUI
}) {
    const [willPresentErrorUI, setWillPresentErrorUI] = _willPresentErrorUI;
    const [willShowLoadingUI, setWillShowLoadingUI] = _willShowLoadingUI;
    const [willFadePresentationIn, setWillFadePresentationIn] = useState(false);
    const [willFadeOutLoadingQuestionsLayout, setWillFadeOutLoadingQuestionLayout] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setWillFadeOutLoadingQuestionLayout(true);
            setTimeout(() => {
                setWillShowLoadingUI(false);
            }, 400);
        }, 1000);
    }, []);

    if (willShowLoadingUI) {
        return <TriviaScreenLoadingPresentation
            _willFadeLoadingQuestionsIn={[willFadePresentationIn, setWillFadePresentationIn]}
            willFadeOutLoadingQuestionsLayout={willFadeOutLoadingQuestionsLayout}
        />
    }

    if (!questions?.length) {
        return <PTxt style={{ textAlign: 'center', paddingLeft: 10, paddingRight: 10 }}>An error has occurred in displaying the question. Please restart the app and try again.</PTxt>;
    }

    const _questions = questions.map((question, index) => ({
        ...question,
        isCurrentQDisplayed: index === 0,
        wasSelectedAnswerCorrect: null
    }))

    return <QuestionChoicesAndAnswerUI _questions={_questions} />
}


function QuestionChoicesAndAnswerUI({ _questions }) {
    const navigationObj = useNavigation();
    const { getTargetTriviaViewState } = useContext(TriviaViewDataContext);
    const [, setTriviaScore] = getTargetTriviaViewState("triviaScore")
    const [questions, setQuestions] = useState(_questions);
    const { text, answer, choices, pictures, explanation } = questions.find(({ isCurrentQDisplayed }) => isCurrentQDisplayed) ?? questions[0];
    const correctImgUrl = (pictures?.length > 1) ? pictures.find(({ choice }) => choice === answer).picUrl : null;
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
    const isBelow375PxViewPortWidth = useMediaQuery({ query: "(max-width: 375px)" });
    const isBelow300PxViewPortWidth = useMediaQuery({ query: "(max-width: 300px)" });
    const isBelow575PxViewPortWidth = useMediaQuery({ query: "(max-width: 575px)" });
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
        }
    }

    if (isBelow300PxViewPortWidth) {
        multipleImgsStyle = {
            width: 115,
            height: 115
        }
        imageContainerStyle = { gap: 10 }
    }

    function handleOnImgPress(name) {
        setSelectedAnswer({ answer: name });
    }

    function handleOnChoiceBtnPress(answer, letter) {
        setSelectedAnswer({ answer: answer, letter: letter });
    }

    function handleOnSubmitBtnPress() {
        setWasSubmitBtnPressed(true);
        setWasSelectedAnswerCorrect(answer === selectedAnswer.answer)
        setWillFadeOutQuestionPromptPictures(true);
        setWillFadeOutQuestionTxt(true);
        setQuestions(questions => questions.map(question => {
            if (question.isCurrentQDisplayed) {
                return {
                    ...question,
                    wasSelectedAnswerCorrect: answer === selectedAnswer.answer
                };
            };

            return question;
        }));

        setTimeout(() => {
            setWillRenderQuestionUI(false);
            setTimeout(() => {
                setWillRenderCorrectAnsUI(true);
            }, 250)
        }, 450);
    }


    function handleOnLayout(event) {
        setStylePropForQuestionAndPicLayout({ height: event?.nativeEvent?.layout?.height })
    }

    function handleNextQuestionBtnPress() {
        let currentQuestionIndex = questions.findIndex(({ isCurrentQDisplayed }) => isCurrentQDisplayed);
        currentQuestionIndex = (currentQuestionIndex === -1) ? 0 : currentQuestionIndex

        if ((currentQuestionIndex + 1) > (questions.length - 1)) {
            const correctQuestionsNum = questions.filter(question => question.wasSelectedAnswerCorrect).length;
            setTriviaScore(correctQuestionsNum / questions.length)
            navigationObj.navigate('Results')
            return;
        };

        setWillRenderCorrectAnsUI(false);
        setWillFadeOutQuestionPromptPictures(false);
        setWillFadeOutCorrectAnsPicture(false);
        setWillFadeOutQuestionTxt(false);
        setWasSubmitBtnPressed(false);
        setWasSelectedAnswerCorrect(false);
        setSelectedAnswer({ answer: "", letter: "" })
        setTimeout(() => {
            const nextQuestionToDisplayIndex = currentQuestionIndex + 1;
            setQuestions(questions => questions.map((question, index) => {
                if (currentQuestionIndex === index) {
                    return {
                        ...question,
                        isCurrentQDisplayed: false
                    }
                }

                if (nextQuestionToDisplayIndex === index) {
                    return {
                        ...question,
                        isCurrentQDisplayed: true
                    }
                }

                return question;
            }))
            setTimeout(() => {
                setWillRenderQuestionUI(true);
            }, 500)
        }, 500)
    }

    const colorForAnswerShownTxts = wasSubmitBtnPressed ? (wasSelectedAnswerCorrect ? 'green' : 'red') : 'white';

    return (
        <>
            <FadeUpAndOut
                dynamicStyles={{
                    height: "100%",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                _willFadeIn={[willFadeInQuestionChoicesAndAnsUI, setWillFadeInQuestionChoicesAndAnsUI]}
                willFadeOut={willFadeOutQuestionChoicesAndAnsUI}
            >
                <View
                    style={{
                        ...questionContainerTxtLayout,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: "80%",
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
                                                    const letter = MULTIPLE_CHOICE_LETTERS[index];
                                                    let answerBackgroundColor = SEAHAWKS_COLORS.home["3rd"]

                                                    if ((selectedAnswer.letter === letter) && !wasSubmitBtnPressed) {
                                                        answerBackgroundColor = SEAHAWKS_COLORS.home["2nd"]
                                                    } else if (wasSubmitBtnPressed && wasSelectedAnswerCorrect && (letter === selectedAnswer.letter)) {
                                                        answerBackgroundColor = 'green';
                                                    } else if (wasSubmitBtnPressed && (letter === selectedAnswer.letter)) {
                                                        answerBackgroundColor = 'red';
                                                    }

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
                                        <PTxt style={{ paddingStart: 5, paddingEnd: 5, color: 'white', textAlign: 'center' }}>{text}</PTxt>
                                    </View>
                                </FadeUpAndOut>
                            </>
                        }
                        {willRenderCorrectAnsUI &&
                            <View style={{ width: '100%', height: '100%' }}>
                                <FadeUpAndOut
                                    dynamicStyles={{
                                        heigth: 20,
                                        width: "100%",
                                        width: "100%",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        bottom: 10,
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

                                                {`${MULTIPLE_CHOICE_LETTERS[choices.findIndex(choiceTxt => choiceTxt === answer)]}. ${answer}`}
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
                            </View>
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
            </FadeUpAndOut>
            <View
                style={{
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'center', alignItems: 'center', bottom: "5%"
                }}
            >
                <Button
                    isDisabled={!wasSubmitBtnPressed}
                    handleOnPress={handleNextQuestionBtnPress}
                    dynamicStyles={{
                        backgroundColor: 'grey',
                        padding: 10,
                        borderRadius: 10,
                        opacity: !wasSubmitBtnPressed ? .3 : 1
                    }}
                >
                    <PTxt style={{ textAlign: 'center', fontSize: 18 }}>
                        Next Q
                    </PTxt>
                </Button>
            </View>
        </>
    )
}

function QuestionCompPresentation({ questions, _willPresentErrorUI, _willShowLoadingUI }) {
    return (
        <View style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <QuestionsChoicesAndAnswerContainer
                questions={questions}
                _willPresentErrorUI={_willPresentErrorUI}
                _willShowLoadingUI={_willShowLoadingUI}
            />
        </View>
    );
};


export default QuestionCompPresentation;


