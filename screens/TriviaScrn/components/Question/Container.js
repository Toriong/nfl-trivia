import React, { useContext, useEffect, useState } from 'react';
import QuestionCompPresentation from './Presentation'
import { useQuery } from '@tanstack/react-query';
import { getTriviaQuestions } from '../../../../services/questions/get';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';
import { TriviaViewDataContext } from '../../../../providers/TriviaViewDataProvider';

function QuestionCompContainer() {
    const { _questionsToDisplayOntoUI } = useContext(TriviaBusinessDataContext);
    const { getTargetTriviaViewState, _willShowLoadingUI, _willPresentErrorUI } = useContext(TriviaViewDataContext)
    const [willPresentErrorUI, setWillPresentErrorUI] = _willPresentErrorUI;
    const [, setWillShowLoadingUI] = _willShowLoadingUI;
    const [, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [isTriviaModeOn,] = getTargetTriviaViewState('isTriviaModeOn')

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
  
    useQuery({
        queryFn: _ => getTriviaQuestions('',
            handleFinallyBlockofGetTriviaQuestionsFn,
            handleGetTriviaQuestionsError,
            handleGetTriviaQuestionsReqSuccess,
            null
        ),
        queryKey: ['questionsQueryKey']
    })

    return <QuestionCompPresentation
        _willPresentErrorUI={[willPresentErrorUI, setWillPresentErrorUI]}
    />;
};

export default QuestionCompContainer;
