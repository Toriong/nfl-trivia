import { View } from 'react-native';
import { mainViewStyleSheet } from './styles'
import React, { useContext } from 'react';
import QuestionCompContainer from './components/Question/Container';
import Timer from './components/Timer';
import GoBackBtn from '../../globalComponents/GoBackBtn';
import { useNavigation } from '@react-navigation/native';
import { TriviaViewDataContext } from '../../providers/TriviaViewDataProvider';
import { TriviaBusinessDataContext } from '../../providers/TriviaBusinessDataProvider';

function TriviaScrnMainPresentation() {
    const { getTargetTriviaViewState } = useContext(TriviaViewDataContext);
    const { _questionsToDisplayOntoUI, _willGetQuestionsFromServer } = useContext(TriviaBusinessDataContext);
    const [, setIntervalTimer] = getTargetTriviaViewState('intervalTimer');
    const [, setTimerMs] = getTargetTriviaViewState('timerMs');
    const naviagationObj = useNavigation();
    const [willGetQuestionsFromServer, setWillGetQuestionsFromServer] = _willGetQuestionsFromServer;
    const [, setQuestionsToDisplayOntoUI] = _questionsToDisplayOntoUI;
    const [, setWillRenderQuestionUI] = getTargetTriviaViewState('willRenderQuestionUI');
    const [, setWillRenderCorrectAnsUI] = getTargetTriviaViewState("willRenderCorrectAnsUI");
    const [, setSelectedAnswer] = getTargetTriviaViewState('selectedAnswer');
    const [, setWillStartTimer] = getTargetTriviaViewState('willStartTimer');
    const [, setWillFadeQuestionPromptPictures] = getTargetTriviaViewState('willFadeOutQuestionPromptPictures');
    const [, setWillFadeOutCorrectAnsPicture] = getTargetTriviaViewState('willFadeOutCorrectAnsPicture');
    const [, setWillFadeOutQuestionTxt] = getTargetTriviaViewState('willFadeOutQuestionTxt');
    const [, setIsTriviaModeOn] = getTargetTriviaViewState("isTriviaModeOn");

    function handleGoBackBtnPress(){
        naviagationObj.navigate('Home')
        setTimeout(() => {
            setQuestionsToDisplayOntoUI([]);
            setWillStartTimer(false);
            setWillFadeOutQuestionTxt(false);
            setWillFadeOutCorrectAnsPicture(false);
            setWillFadeQuestionPromptPictures(false);
            setTimerMs(60_000);
            setWillRenderQuestionUI(true);
            setWillRenderCorrectAnsUI(false);
            setIsTriviaModeOn(false);
            setSelectedAnswer({ answer: "", letter: "" });
            setIntervalTimer(intervalTimer => {
                clearInterval(intervalTimer)
                return null;
            });
        }, 500);
    };

    return (
        <View style={{ ...mainViewStyleSheet.mainView, position: 'relative' }}>
            <Timer />
            <GoBackBtn 
                handleOnPress={handleGoBackBtnPress}
                zIndex={100}
            />
            <QuestionCompContainer />
        </View>
    );
}

export default TriviaScrnMainPresentation;
