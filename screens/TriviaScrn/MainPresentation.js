import { View } from 'react-native';
import { mainViewStyleSheet } from './styles'
import React, { useContext } from 'react';
import QuestionCompContainer from './components/Question/Container';
import Timer from './components/Timer';
import GoBackBtn from './components/buttons/GoBackBtn';
import { useNavigation } from '@react-navigation/native';
import { TriviaViewDataContext } from '../../providers/TriviaViewDataProvider';

function TriviaScrnMainPresentation() {
    const { getTargetTriviaViewState } = useContext(TriviaViewDataContext);
    const [, setIntervalTimer] = getTargetTriviaViewState('intervalTimer');
    const [, setTimerMs] = getTargetTriviaViewState('timerMs');
    const [, setWillStartTimer] = getTargetTriviaViewState('willStartTimer')
    const naviagationObj = useNavigation();

    function handleGoBackBtnPress(){
        naviagationObj.navigate('Home')
        setTimeout(() => {
            setWillStartTimer(false);
            setTimerMs(60_000)
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
