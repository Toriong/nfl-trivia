import React from 'react';
import { PTxt } from '../../../../globalComponents/customTxts';
import { View } from 'react-native';


function SelectedUserAnswer({ children: txt, viewStyles, colorForAnswerShownTxts }){
    return (
        <View style={{ ...viewStyles, borderBottomWidth: .5, borderColor: colorForAnswerShownTxts, minWidth: 200, minHeight: 30 }}>
            <PTxt
                style={{ fontStyle: 'italic', textAlign: 'center', top: 5 }}
                txtColor={colorForAnswerShownTxts}
            >
                {txt}
            </PTxt>
        </View>
    );
};

export default SelectedUserAnswer;
