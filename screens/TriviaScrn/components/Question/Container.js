import React, { useState } from 'react';
import QuestionCompPresentation from './Presentation'
import { useQuery } from '@tanstack/react-query';
import { getTriviaQuestions } from '../../../../services/questions/get';

function QuestionCompContainer() {
    const [willShowLoadingUI, setWillShowLoadingUI] = useState(true);
    const [willPresentErrorUI, setWillPresentErrorUI] = useState(false);

    function handleGetTriviaQuestionsError() {
        setWillPresentErrorUI(true);
    }

    function handleFinallyBlockofGetTriviaQuestionsFn() {
        setTimeout(() => {
            setWillShowLoadingUI(false);
        }, 1000)
    }

    let { data: questions } = useQuery({ queryFn: () => getTriviaQuestions('', handleFinallyBlockofGetTriviaQuestionsFn, handleGetTriviaQuestionsError), queryKey: ['questionsQueryKey'] })

    return <QuestionCompPresentation
        questions={questions}
        _willPresentErrorUI={[willPresentErrorUI, setWillPresentErrorUI]}
        _willShowLoadingUI={[willShowLoadingUI, setWillShowLoadingUI]}
    />;
};

export default QuestionCompContainer;
