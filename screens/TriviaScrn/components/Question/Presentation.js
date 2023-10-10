import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomText from '../../../../styles/globalStyleComps';
import { TriviaBusinessDataContext } from '../../../../providers/TriviaBusinessDataProvider';
import { IS_TESTING } from '../../../../globalVars';

const QuestionCompPresentation = () => {
    const { getTargetTriviaContextBusinessState } = useContext(TriviaBusinessDataContext);
    // const [triviaQuestionsToDisplayOntoUI, ] = getTargetTriviaContextBusinessState('triviaQuestionsToDisplayOntoUI')?.state;
    
    return (
        <View style={styles.container}>
            {/* {pictures?.length &&
                (pictures.length === 1) ?
                <Image src={pictures[0]} />
                :
                pictures.map(picUrl => <Image src={IS_TESTING ? require(picUrl) : picUrl} />)
            } */}
            <CustomText dynamicStyles={styles.questionText}>
                {/* {txt} */}
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
