import React, { useContext, useEffect, useRef, useState } from 'react';
import QuestionCompPresentation from './Presentation'
import { useQuery } from '@tanstack/react-query';
import { getTriviaQuestions } from '../../../../services/questions/get';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';
import { TriviaViewDataContext } from '../../../../providers/TriviaViewDataProvider';

function QuestionCompContainer() {
    const {
        _questionsToDisplayOntoUI,
        _willGetQuestionsFromServer,
    } = useContext(TriviaBusinessDataContext);
    const {
        _willShowLoadingUI,
        _willPresentErrorUI,
        _willFadeOutLoadingQuestionsLayout,
        _willStartTimer
    } = useContext(TriviaViewDataContext)
    const [willPresentErrorUI, setWillPresentErrorUI] = _willPresentErrorUI;
    const [willGetQuestionsFromServer, setWillGetQuestionsFromServer] = _willGetQuestionsFromServer;
    const [, setWillShowLoadingUI] = _willShowLoadingUI;
    const [, setWillStartTimer] = _willStartTimer;
    const [, setWillFadeOutLoadingQuestionLayout] = _willFadeOutLoadingQuestionsLayout;
    const [, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;

    function handleGetTriviaQuestionsError() {
        setWillPresentErrorUI(true);
    }

    // GOAL: get the questions in this component within the useEffect below
    // the questions are rendered onto the DOM
    // the isLoadingUI state is false
    // the questions that are received from the server are inserted into the state of questionsToDisplayOntoUI
    // the questions are received from the function that makes a get request to get the questions from the server 
    // make a get request (simulated for testing) to get the questions from the server
    // navigate to the Trivia screen
    // the state of willGetTriviaQuestions is set true
    // the user clicks on the PLAY button 

    useEffect(() => {
        if (willGetQuestionsFromServer) {
            (async () => {
                try {
                    const { data: questions, msg } = await getTriviaQuestions(
                        '',
                        null,
                        handleGetTriviaQuestionsError,
                    );

                    if (!questions) {
                        throw new Error(`No questions were received from the server. Error msg: ${msg}.`)
                    }

                    setQuestionsToDisplayOntoUI(questions);
                } catch (error) {
                    console.error('An error has occurred: ', error);
                } finally {
                    setTimeout(() => {
                        setWillFadeOutLoadingQuestionLayout(true);
                        setTimeout(() => {
                            setWillShowLoadingUI(false);
                            setTimeout(() => {
                                setWillStartTimer(true);
                            }, 100);
                        }, 400);
                    }, 1_500);
                };
            })();
            setWillGetQuestionsFromServer(false);
        }
    }, [willGetQuestionsFromServer]);


    return <QuestionCompPresentation
        _willPresentErrorUI={[willPresentErrorUI, setWillPresentErrorUI]}
    />;
};

export default QuestionCompContainer;
