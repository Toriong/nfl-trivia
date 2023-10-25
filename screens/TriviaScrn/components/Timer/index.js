import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { PTxt } from "../../../../globalComponents/customTxts";
import { TriviaViewDataContext } from "../../../../providers/TriviaViewDataProvider";
import { useNavigation } from '@react-navigation/native';

function Timer({ timerMiliseconds = 60_000 }) {
    const navigation = useNavigation();
    const [timerMs, setTimerMs] = useState(timerMiliseconds);
    const { getTargetTriviaViewState } = useContext(TriviaViewDataContext);
    const [, setIntervalTimer] = getTargetTriviaViewState('intervalTimer');
    const [isTriviaModeOn, ] = getTargetTriviaViewState('isTriviaModeOn');
    const [isTriviaSessionOver, setIsTriviaSessionOver] = useState(false);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        if (isTriviaSessionOver) {
            setIntervalTimer(intervalTimer => {
                clearInterval(intervalTimer);
                return null;
            });
            navigation.navigate('Results');
            setIsTriviaSessionOver(false);
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
