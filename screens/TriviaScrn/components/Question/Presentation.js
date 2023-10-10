import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomText from '../../../../styles/globalStyleComps';
import { TriviaContext } from '../../../../providers/TriviaBusinessDataProvider';

const QuestionCompPresentation = () => {
    const { getTargetTriviaContextBusinessState } = useContext(TriviaContext);
    const [triviaQuestionToDisplayOntoUI, ]  = getTargetTriviaContextBusinessState('triviaQuestionToDisplayOntoUI').state;
    const { pictures, txt } = triviaQuestionToDisplayOntoUI;

    return (
        <View style={styles.container}>
            {pictures &&
                (pictures.length === 1) ?
                <Image src={pictures[0]} />
                :
                pictures.map(picUrl => {
                    <Image src={picUrl} />
                })
            }
            <CustomText dynamicStyles={styles.questionText}>
                {question}
            </CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default QuestionCompPresentation;
