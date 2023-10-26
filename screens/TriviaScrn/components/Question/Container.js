import React, { useContext, useEffect, useRef, useState } from 'react';
import QuestionCompPresentation from './Presentation'
import { useQuery } from '@tanstack/react-query';
import { getTriviaQuestions } from '../../../../services/questions/get';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';
import { TriviaViewDataContext } from '../../../../providers/TriviaViewDataProvider';

function QuestionCompContainer() {
    const { _questionsToDisplayOntoUI, _willGetQuestionsFromServer } = useContext(TriviaBusinessDataContext);
    const { getTargetTriviaViewState, _willShowLoadingUI, _willPresentErrorUI } = useContext(TriviaViewDataContext)
    const [willPresentErrorUI, setWillPresentErrorUI] = _willPresentErrorUI;
    const [willGetQuestionsFromServer, setWillGetQuestionsFromServer] = _willGetQuestionsFromServer;
    const [, setWillShowLoadingUI] = _willShowLoadingUI;
    const [questionToDisplayOntoUI, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [isTriviaModeOn,] = getTargetTriviaViewState('isTriviaModeOn');
    const didFirstRenderOccur = useRef(false);

    function handleGetTriviaQuestionsError() {
        setWillPresentErrorUI(true);
    }

    function handleFinallyBlockofGetTriviaQuestionsFn() {
        setTimeout(() => {
            setWillShowLoadingUI(false);
        }, 1_000);
    }

    function handleGetTriviaQuestionsReqSuccess(triviaQuestions) {
        if (isTriviaModeOn) {
            const triviaQuestionsUpdated = triviaQuestions.map((question, index) => ({
                ...question,
                isCurrentQDisplayed: index === 0,
                selectedAnswer: null
            }));
            setQuestionsToDisplayOntoUI(triviaQuestionsUpdated);
        }
    }

    const { refetch } = useQuery({
        queryFn: _ => getTriviaQuestions('',
            handleFinallyBlockofGetTriviaQuestionsFn,
            handleGetTriviaQuestionsError,
            handleGetTriviaQuestionsReqSuccess,
            null
        ),
        queryKey: ['questionsQueryKey'],
    });

    useEffect(() => {
        console.log("questionToDisplayOntoUI: ", questionToDisplayOntoUI)
        console.log("willGetQuestionsFromServer: ", willGetQuestionsFromServer)
        if (!didFirstRenderOccur.current) {
            didFirstRenderOccur.current = true
        } else if (!questionToDisplayOntoUI.length && willGetQuestionsFromServer) {
            console.log('Getting questions again swag...')
            setWillShowLoadingUI(true);
            refetch();
            setWillGetQuestionsFromServer(false);
        };
    }, [willGetQuestionsFromServer]);


    return <QuestionCompPresentation
        _willPresentErrorUI={[willPresentErrorUI, setWillPresentErrorUI]}
    />;
};

export default QuestionCompContainer;
