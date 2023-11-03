import { View } from 'react-native';
import { mainViewStyleSheet } from './styles'
import React, { memo, useContext } from 'react';
import QuestionCompContainer from './components/Question/Container';
import Timer from './components/Timer';
import GoBackBtn from '../../globalComponents/GoBackBtn';
import { useNavigation } from '@react-navigation/native';
import { TriviaViewDataContext } from '../../providers/TriviaViewDataProvider';
import { TriviaBusinessDataContext } from '../../providers/TriviaBusinessDataProvider';
import UserInteractionSection from './components/UserInteractionSection/UserInteractionSection';

const TriviaScrnMainPresentation = () => {
    const {
        _intervalTimer,
        _timerMs,
        _willRenderQuestionUI,
        _willRenderCorrectAnsUI,
        _selectedAnswer,
        _willFadeOutQuestionPromptPictures,
        _willFadeOutQuestionTxt,
        _isTriviaModeOn,
        _willStartTimer,
        _willFadeLoadingQuestionsIn,
        _willFadeOutLoadingQuestionsLayout,
        _willShowLoadingUI
    } = useContext(TriviaViewDataContext);
    const {
        _questionsToDisplayOntoUI,
    } = useContext(TriviaBusinessDataContext);
    const [willShowLoadingUI,] = _willShowLoadingUI;
    const [, setIntervalTimer] = _intervalTimer
    const [, setTimerMs] = _timerMs
    const naviagationObj = useNavigation();
    const [, setWillFadeLoadingQuestionsIn] = _willFadeLoadingQuestionsIn;
    const [, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [, setWillFadeOutLoadingQuestionLayout] = _willFadeOutLoadingQuestionsLayout;
    const [, setWillRenderQuestionUI] = _willRenderQuestionUI
    const [, setWillRenderCorrectAnsUI] = _willRenderCorrectAnsUI
    const [, setSelectedAnswer] = _selectedAnswer
    const [, setWillStartTimer] = _willStartTimer;
    const [, setWillFadeQuestionPromptPictures] = _willFadeOutQuestionPromptPictures
    const [, setWillFadeOutQuestionTxt] = _willFadeOutQuestionTxt
    const [, setIsTriviaModeOn] = _isTriviaModeOn

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
        <View style={{ ...mainViewStyleSheet.mainView, position: 'relative', borderWidth: 1, borderColor: 'pink' }}>
            {/* {!willPresentErrorUI && <Timer />} */}
            <GoBackBtn
                handleOnPress={handleGoBackBtnPress}
                zIndex={100}
            />
            <QuestionCompContainer />
            {!willShowLoadingUI &&
                <View style={{ height: "20%", width: "100%" }}>
                    <UserInteractionSection />
                </View>
            }
        </View>
    );
}

export default TriviaScrnMainPresentation;
