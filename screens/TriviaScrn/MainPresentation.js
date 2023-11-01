import { View } from 'react-native';
import { mainViewStyleSheet } from './styles'
import React, { memo, useContext } from 'react';
import QuestionCompContainer from './components/Question/Container';
import Timer from './components/Timer';
import GoBackBtn from '../../globalComponents/GoBackBtn';
import { useNavigation } from '@react-navigation/native';
import { TriviaViewDataContext } from '../../providers/TriviaViewDataProvider';
import { TriviaBusinessDataContext } from '../../providers/TriviaBusinessDataProvider';

const  TriviaScrnMainPresentation = () => {
    const {
        getTargetTriviaViewState,
        _willStartTimer,
        _willFadeLoadingQuestionsIn,
        _willFadeOutLoadingQuestionsLayout,
        _willPresentErrorUI
    } = useContext(TriviaViewDataContext);
    const {
        _questionsToDisplayOntoUI,
    } = useContext(TriviaBusinessDataContext);
    const [, setIntervalTimer] = getTargetTriviaViewState('intervalTimer');
    const [, setTimerMs] = getTargetTriviaViewState('timerMs');
    const naviagationObj = useNavigation();
    const [willPresentErrorUI, ] = _willPresentErrorUI;
    const [, setWillFadeLoadingQuestionsIn] = _willFadeLoadingQuestionsIn;
    const [, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [, setWillFadeOutLoadingQuestionLayout] = _willFadeOutLoadingQuestionsLayout;
    const [, setWillRenderQuestionUI] = getTargetTriviaViewState('willRenderQuestionUI');
    const [, setWillRenderCorrectAnsUI] = getTargetTriviaViewState("willRenderCorrectAnsUI");
    const [, setSelectedAnswer] = getTargetTriviaViewState('selectedAnswer');
    const [, setWillStartTimer] = _willStartTimer;
    const [, setWillFadeQuestionPromptPictures] = getTargetTriviaViewState('willFadeOutQuestionPromptPictures');
    const [, setWillFadeOutCorrectAnsPicture] = getTargetTriviaViewState('willFadeOutCorrectAnsPicture');
    const [, setWillFadeOutQuestionTxt] = getTargetTriviaViewState('willFadeOutQuestionTxt');
    const [, setIsTriviaModeOn] = getTargetTriviaViewState("isTriviaModeOn");

    function handleGoBackBtnPress() {
        naviagationObj.navigate('Home')
        setTimeout(() => {
            setQuestionsToDisplayOntoUI([]);
            setWillFadeLoadingQuestionsIn(true);
            setWillStartTimer(false);
            setWillFadeOutQuestionTxt(false);
            setWillFadeOutCorrectAnsPicture(false);
            setWillFadeQuestionPromptPictures(false);
            setWillFadeOutLoadingQuestionLayout(false);
            setTimerMs(60_000);
            setWillRenderQuestionUI(true);
            setWillRenderCorrectAnsUI(false);
            setIsTriviaModeOn(true);
            setSelectedAnswer({ answer: "", letter: "" });
            setIntervalTimer(intervalTimer => {
                clearInterval(intervalTimer)
                return null;
            });
        }, 500);
    };

    return (
        <View style={{ ...mainViewStyleSheet.mainView, position: 'relative' }}>
            {/* {!willPresentErrorUI && <Timer />} */}
            <GoBackBtn
                handleOnPress={handleGoBackBtnPress}
                zIndex={100}
            />
            <QuestionCompContainer />
        </View>
    );
}

export default TriviaScrnMainPresentation;
