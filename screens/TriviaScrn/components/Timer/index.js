import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { PTxt } from "../../../../globalComponents/customTxts";
import { TriviaViewDataContext } from "../../../../providers/TriviaViewDataProvider";
import { useNavigation } from '@react-navigation/native';
import { TriviaBusinessDataContext } from "../../../../providers/TriviaBusinessDataProvider";

function Timer() {
    const navigation = useNavigation();
    const {
        _willStartTimer,
        _timerMs,
        _intervalTimer,
        _isTriviaModeOn,
    } = useContext(TriviaViewDataContext);
    const {
        _willSendReqToServerToSaveAnsweredQs,
    } = useContext(TriviaBusinessDataContext);
    const [timerMs, setTimerMs] = _timerMs
    const [, setIntervalTimer] = _intervalTimer;
    const [, setWillSendReqToServertoSaveAnweredQs] = _willSendReqToServerToSaveAnsweredQs
    const [isTriviaModeOn,] = _isTriviaModeOn
    const [willStartTimer, setWillStartTimer] = _willStartTimer
    const [isTriviaSessionOver, setIsTriviaSessionOver] = useState(false);

    useEffect(() => {
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
            setWillSendReqToServertoSaveAnweredQs(true);
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
