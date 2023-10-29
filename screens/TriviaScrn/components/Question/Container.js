import React, { useContext, useEffect } from 'react';
import QuestionCompPresentation from './Presentation';
import API_PATHS from '../../../../services/globalServicesVars';
import { getTriviaQuestions } from '../../../../services/questions/get';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';
import { TriviaViewDataContext } from '../../../../providers/TriviaViewDataProvider';

// GOAL: Show the selected answer when the user selects an answer for the true or false prompt 

// CHECK WHAT IS BEING STORED WHEN THE USER CLICKS ON A CHOICE FOR THE STATE OF selectedAnswer 

const QuestionCompContainer = () => {
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
}

export default QuestionCompContainer;
