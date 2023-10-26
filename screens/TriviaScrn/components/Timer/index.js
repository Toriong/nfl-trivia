import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { PTxt } from "../../../../globalComponents/customTxts";
import { TriviaViewDataContext } from "../../../../providers/TriviaViewDataProvider";
import { useNavigation } from '@react-navigation/native';

function Timer() {
    const navigation = useNavigation();
    const { getTargetTriviaViewState, _willStartTimer } = useContext(TriviaViewDataContext);
    const [timerMs, setTimerMs] = getTargetTriviaViewState('timerMs')
    const [, setIntervalTimer] = getTargetTriviaViewState('intervalTimer');
    const [isTriviaModeOn,] = getTargetTriviaViewState('isTriviaModeOn');
    const [willStartTimer, setWillStartTimer] = _willStartTimer
    const [isTriviaSessionOver, setIsTriviaSessionOver] = useState(false);

    useEffect(() => {
        // GOAL: create state, that if true, will execute the code below, and after the execution is done, will make the state false again
        if (willStartTimer) {
            setTimeout(() => {
                const intervalTimer = setInterval(() => {
                    setTimerMs(timerMs => {
                        if (timerMs === null) {
                            return null;
                        }

                        if (timerMs === 0) {
                            setIsTriviaSessionOver(true);
                            return null;
                        }

                        return timerMs - 1_000;
                    });
                }, 1_000)
                setIntervalTimer(intervalTimer);
            }, 750);
            setWillStartTimer(false);
        }

    }, [willStartTimer]);

    useEffect(() => {
        if (isTriviaSessionOver) {
            setIntervalTimer(intervalTimer => {
                clearInterval(intervalTimer);
                return null;
            });
            navigation.navigate('Results');
            setIsTriviaSessionOver(false);
            setTimeout(() => {
                setTimerMs(60_000);
            }, 500)
        }
    }, [isTriviaSessionOver]);

    return (
        <View
            style={{
                width: '100%',
                position: 'absolute',
                top: "1.3%",
            }}
        >
            <PTxt
                style={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 24
                }}
            >
                {isTriviaModeOn ? (timerMs === null) ? 0 : (timerMs / 1_000) : ""}
            </PTxt>
        </View>
    )
}

export default Timer;
