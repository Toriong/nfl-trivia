import React from 'react';
import { Button } from '../../../../globalComponents/buttons';
import { PTxt } from '../../../../globalComponents/customTxts';

function NextQuestion({ wasSubmitBtnPressed, handleNextQuestionBtnPress, btnTxt }) {
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
                {btnTxt}
            </PTxt>
        </Button>
    );
};

export default NextQuestion;
