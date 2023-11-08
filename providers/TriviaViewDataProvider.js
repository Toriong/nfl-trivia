import React, { createContext, useState } from 'react';

export const TriviaViewDataContext = createContext();

export const TriviaViewDataProvider = ({ children }) => {
    const _isTriviaModeOn = useState(true);
    const _selectedAnswer = useState({ answer: "", letter: "" });
    const _willShowLoadingUI = useState(true);
    const _willPresentErrorUI = useState(false);
    const _willFadeOutLoadingQuestionsLayout = useState(false);
    const _willFadeLoadingQuestionsIn = useState(true);
    const _willFadeOutQuestionPromptPictures = useState(false)
    const _wasSelectedAnswerCorrect = useState(false);
    const _willRenderQuestionUI = useState(true);
    const _willRenderCorrectAnsUI = useState(false);
    const _stylePropForQuestionAndPicLayout = useState({});
    const _isReviewingQs = useState(false);
    const _willFadeOutQuestionTxt = useState(false);
    const _wasSubmitBtnPressed = useState(false);
    const _willFadeOutQuestionChoicesAndAnsUI = useState(false);
    const _willFadeInQuestionChoicesAndAnsUI = useState(true);
    const _intervalTimer = useState(null);
    const _timerMs = useState(90_000);
    const _willStartTimer = useState(false);


    return (
        <TriviaViewDataContext.Provider
            value={{
                _isReviewingQs,
                _timerMs,
                _stylePropForQuestionAndPicLayout,
                _willRenderCorrectAnsUI,
                _wasSubmitBtnPressed,
                _willFadeOutQuestionTxt,
                _willShowLoadingUI,
                _selectedAnswer,
                _willPresentErrorUI,
                _willFadeOutLoadingQuestionsLayout,
                _willFadeLoadingQuestionsIn,
                _willFadeOutQuestionPromptPictures,
                _wasSelectedAnswerCorrect,
                _willRenderQuestionUI,
                _willStartTimer,
                _isTriviaModeOn,
                _intervalTimer,
                _willFadeInQuestionChoicesAndAnsUI,
                _willFadeOutQuestionChoicesAndAnsUI
            }}
        >
            {children}
        </TriviaViewDataContext.Provider>
    );
};
