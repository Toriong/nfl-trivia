import React, { useContext, useEffect, useState } from 'react';
import QuestionCompPresentation from './Presentation'
import { useQuery } from '@tanstack/react-query';
import { getTriviaQuestions } from '../../../../services/questions/get';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';

function QuestionCompContainer() {
    const [willShowLoadingUI, setWillShowLoadingUI] = useState(true);
    const [willPresentErrorUI, setWillPresentErrorUI] = useState(false);
    const { getTargetTriviaContextBusinessState } = useContext(TriviaBusinessDataContext);
    const [questionsToDisplayOntoUI, setQuestionsToDisplayOntoUI] = getTargetTriviaContextBusinessState('questionsToDisplayOntoUI')

    function handleGetTriviaQuestionsError() {
        setWillPresentErrorUI(true);
    }

    function handleFinallyBlockofGetTriviaQuestionsFn() {
        setTimeout(() => {
            setWillShowLoadingUI(false);
        }, 1_000);
    }

    function handleGetTriviaQuestionsReqSuccess(triviaQuestions) {
        const triviaQuestionsUpdated = triviaQuestions.map((question, index) => ({
            ...question,
            isCurrentQDisplayed: index === 0,
            wasSelectedAnswerCorrect: null,
            selectedAnswer: null
        }));
        setQuestionsToDisplayOntoUI(triviaQuestionsUpdated);
    }

    useQuery({
        queryFn: _ => getTriviaQuestions('',
            handleFinallyBlockofGetTriviaQuestionsFn,
            handleGetTriviaQuestionsError,
            handleGetTriviaQuestionsReqSuccess
        ),
        queryKey: ['questionsQueryKey']
    })

    return <QuestionCompPresentation
        _willPresentErrorUI={[willPresentErrorUI, setWillPresentErrorUI]}
        _willShowLoadingUI={[willShowLoadingUI, setWillShowLoadingUI]}
    />;
};

export default QuestionCompContainer;
