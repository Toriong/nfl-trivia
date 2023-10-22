import React from 'react';
import { Button } from '../../../../globalComponents/buttons';
import { PTxt } from '../../../../globalComponents/customTxts';

function NextQuestion({ wasSubmitBtnPressed, handleNextQuestionBtnPress }) {
    return (
        <Button
            isDisabled={!wasSubmitBtnPressed}
            handleOnPress={handleNextQuestionBtnPress}
            dynamicStyles={{
                backgroundColor: 'grey',
                padding: 10,
                borderRadius: 10,
                opacity: !wasSubmitBtnPressed ? .3 : 1
            }}
        >
            <PTxt style={{ textAlign: 'center' }}>
                Next Q
            </PTxt>
        </Button>
    );
};

export default NextQuestion;
