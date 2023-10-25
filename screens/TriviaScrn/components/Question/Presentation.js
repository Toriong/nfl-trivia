import React, { useContext, useState } from 'react';
import { View, Image } from 'react-native';
import { IS_TESTING, MULTIPLE_CHOICE_LETTERS } from '../../../../globalVars';
import { ActivityIndicator } from 'react-native';
import { HeadingTxt, PTxt } from '../../../../globalComponents/customTxts';
import FadeUpAndOut from '../../../../animations/FadeUpAndOut';
import { SEAHAWKS_COLORS, CENTER_DEFAULT } from '../../../../styles/globalStylesVars';
import { Button } from '../../../../globalComponents/buttons';
import { useMediaQuery } from "react-responsive";
import { useNavigation } from '@react-navigation/native';
import { TriviaViewDataContext } from '../../../../providers/TriviaViewDataProvider';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SelectedUserAnswer from '../UserAnswer/SelectedUserAnswer';
import CustomLocalStorage from '../../../../globalHelperFns/localStorage';
import NextQuestion from '../buttons/NextQuestion';

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
    _willShowLoadingUI,
    _willPresentErrorUI
}) {
    const { getTargetTriviaContextBusinessState } = useContext(TriviaBusinessDataContext);
    const [questionsToDisplayOntoUI,] = getTargetTriviaContextBusinessState('questionsToDisplayOntoUI')
    const [willPresentErrorUI, setWillPresentErrorUI] = _willPresentErrorUI;
    const [willShowLoadingUI, setWillShowLoadingUI] = _willShowLoadingUI;
    const [willFadePresentationIn, setWillFadePresentationIn] = useState(false);
    const [willFadeOutLoadingQuestionsLayout, setWillFadeOutLoadingQuestionLayout] = useState(false);

    if (willShowLoadingUI) {
        console.log('loading screen is displayed...')
        return <TriviaScreenLoadingPresentation
            _willFadeLoadingQuestionsIn={[willFadePresentationIn, setWillFadePresentationIn]}
            willFadeOutLoadingQuestionsLayout={willFadeOutLoadingQuestionsLayout}
        />
    }

    if (!questionsToDisplayOntoUI?.length && !willShowLoadingUI) {
        return <PTxt style={{ textAlign: 'center', paddingLeft: 10, paddingRight: 10 }}>An error has occurred in displaying the question. Please restart the app and try again.</PTxt>;
    }

    return <QuestionChoicesAndAnswerUI />
}

// using the selectedAnswer locally: 
// when the user goes back to the trivia screen from the results screen, you must show the correct answer of the use
// isReviewing is true, then for the answer field it must be the selected answer from the last question of the state that holds all of the questions 
// and its corresponding letter

const storage = new CustomLocalStorage();

function QuestionChoicesAndAnswerUI() {
    const navigationObj = useNavigation();
    const { getTargetTriviaViewState } = useContext(TriviaViewDataContext);
    const { getTargetTriviaContextBusinessState } = useContext(TriviaBusinessDataContext);
    const [selectedAnswer, setSelectedAnswer] = getTargetTriviaViewState('selectedAnswer');
    const [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI] = getTargetTriviaContextBusinessState('questionsToDisplayOntoUI');
    const [stylePropForQuestionAndPicLayout, setStylePropForQuestionAndPicLayout] = getTargetTriviaViewState('stylePropForQuestionAndPicLayout');
    const [, setIntervalTimer] = getTargetTriviaViewState('intervalTimer');
    const [isTriviaModeOn,] = getTargetTriviaViewState('isTriviaModeOn')
    const indexOfCurrentQuestionDisplayed = questionsToDisplayOntoUI.findIndex(({ isCurrentQDisplayed }) => isCurrentQDisplayed);
    const { text, answer, choices, pictures, explanation } = questionsToDisplayOntoUI[indexOfCurrentQuestionDisplayed] ?? questionsToDisplayOntoUI[0];
    const correctImgUrl = (pictures?.length > 1) ? pictures.find(({ choice }) => choice === answer).picUrl : null;
    const [willFadeInQuestionChoicesAndAnsUI, setWillFadeInQuestionChoicesAndAnsUI] = useState(true);
    const [willFadeOutQuestionChoicesAndAnsUI, setWillFadeOutQuestionChoicesAndAnsUI] = useState(false);
    const [willFadeOutExplanationTxt, setWillFadeOutExplanationTxt] = useState(false);
    const [willFadeOutQuestionPromptPictures, setWillFadeOutQuestionPromptPictures] = getTargetTriviaViewState('willFadeOutQuestionPromptPictures');
    const [willFadeOutCorrectAnsPicture, setWillFadeOutCorrectAnsPicture] = getTargetTriviaViewState('willFadeOutCorrectAnsPicture');
    const [willFadeOutQuestionTxt, setWillFadeOutQuestionTxt] = getTargetTriviaViewState('willFadeOutQuestionTxt');
    const [willRenderCorrectAnsUI, setWillRenderCorrectAnsUI] = getTargetTriviaViewState('willRenderCorrectAnsUI');
    const [willRenderQuestionUI, setWillRenderQuestionUI] = getTargetTriviaViewState('willRenderQuestionUI');
    const [isReviewingQs, setIsReviewingQs] = getTargetTriviaViewState('isReviewingQs');
    const [wasSubmitBtnPressed, setWasSubmitBtnPressed] = getTargetTriviaViewState('wasSubmitBtnPressed');
    const [, setTimerMs] = getTargetTriviaViewState('timerMs');
    const [wasSelectedAnswerCorrect, setWasSelectedAnswerCorrect] = useState(false);
    const isBelow375PxViewPortWidth = useMediaQuery({ query: "(max-width: 375px)" });
    const isBelow300PxViewPortWidth = useMediaQuery({ query: "(max-width: 300px)" });
    const isBelow575PxViewPortWidth = useMediaQuery({ query: "(max-width: 575px)" });
    let multipleImgsStyle = { width: 155, height: 155 }
    let btnContainerStyle = { marginTop: 20 }
    let questionContainerTxtLayout = { padding: 20 }
    let imageContainerStyle = { gap: 20 }
    let selectedAnswerContainerStyle = { top: 30 }
    let buttonStyle = { marginTop: 40 }
    let selectedAnsContainerStyles = { marginTop: 20 }

    if (isBelow575PxViewPortWidth) {
        questionContainerTxtLayout = {}
        btnContainerStyle = {};
        selectedAnswerContainerStyle = {};
        selectedAnsContainerStyles = { marginTop: 5 }
        buttonStyle = { marginTop: 10 };
        multipleImgsStyle = {
            width: 150,
            height: 150
        }
    }

    if (isBelow375PxViewPortWidth) {
        multipleImgsStyle = {
            width: 135,
            height: 135
        }
    }

    if (isBelow300PxViewPortWidth) {
        multipleImgsStyle = {
            width: 105,
            height: 105
        }
        imageContainerStyle = { gap: 10 }
    }

    function handleOnImgPress(name) {
        setSelectedAnswer({ answer: name });
    }

    function handleOnChoiceBtnPress(answer, letter) {
        setSelectedAnswer({ answer: answer, letter: letter });
    }

    function handleOnShowQuestionBtnPress() {
        setWillFadeOutQuestionPromptPictures(false);
        setWillFadeOutQuestionTxt(false);
        setWasSubmitBtnPressed(false);
        setWillRenderCorrectAnsUI(false);
        setWillRenderQuestionUI(true);
    }

    function handleOnSubmitBtnPress() {
        setWasSubmitBtnPressed(true);
        setWasSelectedAnswerCorrect(answer === selectedAnswer.answer)
        setWillFadeOutQuestionPromptPictures(true);
        setWillFadeOutQuestionTxt(true);
        setQuestionsToDisplayOntoUI(questions => questions.map(question => {
            if (question.isCurrentQDisplayed) {
                return {
                    ...question,
                    selectedAnswer: selectedAnswer.answer
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

    function handleArrowBtnPress(numToIncreaseOrDecreaseIndexOfCurrentQ) {
        try {
            const indexOfNewQuestion = indexOfCurrentQuestionDisplayed + (numToIncreaseOrDecreaseIndexOfCurrentQ);

            if (!questionsToDisplayOntoUI[indexOfNewQuestion]) {
                throw new Error('The question does not exist.')
            }

            setWasSubmitBtnPressed(false);
            setWillRenderCorrectAnsUI(false);
            setWillRenderQuestionUI(true);
            setWillFadeOutCorrectAnsPicture(false);
            setWillFadeOutExplanationTxt(false);
            setWillFadeOutQuestionPromptPictures(false);
            setWillFadeOutQuestionTxt(false);
            const { selectedAnswer, choices } = questionsToDisplayOntoUI[indexOfNewQuestion];
            const _selectedAnswer = choices ? { answer: selectedAnswer, letter: MULTIPLE_CHOICE_LETTERS[choices.findIndex(choiceTxtStr => choiceTxtStr === selectedAnswer)] } : { answer: selectedAnswer }
            setSelectedAnswer(_selectedAnswer);
            setQuestionsToDisplayOntoUI(questions => questions.map((question, index) => {
                if (indexOfCurrentQuestionDisplayed === index) {
                    return {
                        ...question,
                        isCurrentQDisplayed: false,
                    };
                }

                if (indexOfNewQuestion === index) {
                    return {
                        ...question,
                        isCurrentQDisplayed: true
                    }
                }

                return question;
            }));
        } catch (error) {
            console.error('An errror has occurred in pressing the arrow button: ', error);
        }
    }

    function handleResultsBtnPress() {
        storage.setData('triviaScrnHeight', stylePropForQuestionAndPicLayout)
        navigationObj.navigate('Results');
    }
    
    function handleViewResultsBtn() {
        setIntervalTimer(intervalTimer => {
            clearInterval(intervalTimer);
            return null;
        });
        storage.setData('triviaScrnHeight', stylePropForQuestionAndPicLayout)
        navigationObj.navigate('Results');
    }

    const currentQuestionIndex = questionsToDisplayOntoUI.findIndex(({ isCurrentQDisplayed }) => isCurrentQDisplayed);

    function handleNextQuestionBtnPress() {
        let currentQuestionIndex = questionsToDisplayOntoUI.findIndex(({ isCurrentQDisplayed }) => isCurrentQDisplayed);
        currentQuestionIndex = (currentQuestionIndex === -1) ? 0 : currentQuestionIndex
        setWillRenderCorrectAnsUI(false);
        setWillFadeOutQuestionPromptPictures(false);
        setWillFadeOutCorrectAnsPicture(false);
        setWillFadeOutQuestionTxt(false);
        setWasSubmitBtnPressed(false);
        setWasSelectedAnswerCorrect(false);
        const selectedAnswerClone = structuredClone(selectedAnswer);
        setSelectedAnswer({ answer: "", letter: "" });
        setTimeout(() => {
            const nextQuestionToDisplayIndex = currentQuestionIndex + 1;
            setQuestionsToDisplayOntoUI(questions => questions.map((question, index) => {
                if (currentQuestionIndex === index) {
                    const _updatedQuestion = {
                        ...question,
                        isCurrentQDisplayed: false,
                        selectedAnswer: selectedAnswerClone.answer
                    }

                    return _updatedQuestion;
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
            }, 150)
        }, 150)
    }

    let colorForAnswerShownTxts = wasSubmitBtnPressed ? (wasSelectedAnswerCorrect ? 'green' : 'red') : 'white';

    if (isReviewingQs && !wasSubmitBtnPressed) {
        colorForAnswerShownTxts = 'white';
    }

    return (
        <FadeUpAndOut
            dynamicStyles={{
                height: "100%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                top: 10

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
                                                            isDisabled={isReviewingQs}
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

                                                if (isTriviaModeOn && ((selectedAnswer.letter === letter) && !wasSubmitBtnPressed)) {
                                                    answerBackgroundColor = SEAHAWKS_COLORS.home["2nd"]
                                                } else if (isTriviaModeOn && (wasSubmitBtnPressed && wasSelectedAnswerCorrect && (letter === selectedAnswer.letter))) {
                                                    answerBackgroundColor = 'green';
                                                } else if (isTriviaModeOn && (wasSubmitBtnPressed && (letter === selectedAnswer.letter))) {
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
                                                            alignItems: 'center',
                                                            paddingLeft: 10,
                                                            paddingRight: 10
                                                        }}
                                                    >
                                                        <Button
                                                            isDisabled={isReviewingQs}
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
                                            width: "80%",
                                            height: 50,
                                            backgroundColor: 'green',
                                            borderRadius: 10,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            top: 15
                                        }}
                                    >
                                        <PTxt style={{ textAlign: 'center' }}>
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
                                    marginBottom: "3%"
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
                                }}
                                willFadeOut={willFadeOutExplanationTxt}
                            >
                                <View
                                    style={{
                                        width: "100%",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >

                                    <PTxt
                                        txtColor={colorForAnswerShownTxts}
                                        style={{ color: 'white', textAlign: 'center', paddingStart: 25, paddingEnd: 25 }}
                                    >
                                        {wasSelectedAnswerCorrect ? "Correct" : "Incorrect"}
                                    </PTxt>
                                    <PTxt
                                        txtColor={colorForAnswerShownTxts}
                                        style={{ color: 'white', textAlign: 'center', paddingStart: 25, paddingEnd: 25 }}
                                    >
                                        {wasSelectedAnswerCorrect ? "👍" : "👎"}
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
                        <PTxt txtColor={colorForAnswerShownTxts}>Your answer: </PTxt>
                    </View>
                    <SelectedUserAnswer
                        viewStyles={selectedAnsContainerStyles}
                        colorForAnswerShownTxts={colorForAnswerShownTxts}
                    >
                        {pictures && selectedAnswer.answer}
                        {!pictures && ((selectedAnswer.letter && selectedAnswer.answer) ? `${selectedAnswer.letter}. ${selectedAnswer.answer}` : '')}
                    </SelectedUserAnswer>
                </View>
                {isTriviaModeOn && <View style={{ ...btnContainerStyle, width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        isDisabled={selectedAnswer.answer === ""}
                        dynamicStyles={{
                            opacity: selectedAnswer.answer === "" ? .3 : 1,
                            backgroundColor: '#69BE28',
                            padding: 10,
                            borderRadius: 10,
                            ...buttonStyle
                        }}
                        handleOnPress={handleOnSubmitBtnPress}
                    >
                        <PTxt>Submit</PTxt>
                    </Button>
                </View>}

                <View style={{
                    ...CENTER_DEFAULT.center,
                    width: "100%",
                    top: "3%"
                }}>
                    {isTriviaModeOn ?
                        <NextQuestion
                            btnTxt={((currentQuestionIndex + 1) > (questionsToDisplayOntoUI.length - 1)) ? "View Results" : "Next"}
                            wasSubmitBtnPressed={wasSubmitBtnPressed}
                            handleNextQuestionBtnPress={((currentQuestionIndex + 1) > (questionsToDisplayOntoUI.length - 1)) ? handleViewResultsBtn : handleNextQuestionBtnPress}
                        />
                        :
                        <>
                            <View style={{
                                width: "100%",
                                flexDirection: 'row',
                                gap: 10,
                                ...CENTER_DEFAULT.center
                            }}>
                                <Button
                                    handleOnPress={() => handleArrowBtnPress(-1)}
                                    dynamicStyles={{
                                        ...CENTER_DEFAULT.center,
                                        borderRadius: 15,
                                        padding: 13,
                                        backgroundColor: SEAHAWKS_COLORS.home['3rd']
                                    }}
                                    willShowDisableOpacity
                                    isDisabled={indexOfCurrentQuestionDisplayed === 0}
                                >
                                    <FontAwesomeIcon
                                        icon={faArrowLeft}
                                        color="white"
                                        size={27}
                                    />
                                </Button>
                                <Button
                                    handleOnPress={willRenderCorrectAnsUI ? handleOnShowQuestionBtnPress : handleOnSubmitBtnPress}
                                    dynamicStyles={{
                                        ...CENTER_DEFAULT.center,
                                        width: 225,
                                        borderRadius: 15,
                                        padding: 13,
                                        backgroundColor: SEAHAWKS_COLORS.home['3rd'],
                                        flexDirection: 'column'
                                    }}
                                >
                                    <PTxt style={{ width: '100%', textAlign: 'center' }}>Show {willRenderCorrectAnsUI ? 'Question' : 'Answer'}</PTxt>
                                </Button>
                                <Button
                                    handleOnPress={() => handleArrowBtnPress(1)}
                                    willShowDisableOpacity
                                    dynamicStyles={{
                                        ...CENTER_DEFAULT.center,
                                        borderRadius: 15,
                                        padding: 13,
                                        backgroundColor: SEAHAWKS_COLORS.home['3rd']
                                    }}
                                    isDisabled={indexOfCurrentQuestionDisplayed === (questionsToDisplayOntoUI.length - 1)}
                                >
                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        color="white"
                                        size={27}
                                    />
                                </Button>
                            </View>
                            <View style={{
                                width: "100%",
                                marginTop: 10,
                                ...CENTER_DEFAULT.center
                            }}>
                                <Button
                                    dynamicStyles={{
                                        ...CENTER_DEFAULT.center,
                                        borderRadius: 15,
                                        padding: 13,
                                        backgroundColor: SEAHAWKS_COLORS.home['2nd']
                                    }}
                                    handleOnPress={handleResultsBtnPress}
                                >
                                    <PTxt txtColor="white" style={{}}>
                                        Results
                                    </PTxt>
                                </Button>
                            </View>
                        </>
                    }
                </View>
            </View>
        </FadeUpAndOut>
    )
}

function QuestionCompPresentation({ _willPresentErrorUI, _willShowLoadingUI }) {
    return (
        <View style={{ height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <QuestionsChoicesAndAnswerContainer
                _willPresentErrorUI={_willPresentErrorUI}
                _willShowLoadingUI={_willShowLoadingUI}
            />
        </View>
    );
};


export default QuestionCompPresentation;


