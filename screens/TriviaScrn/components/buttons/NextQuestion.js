import React from 'react';

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
            <PTxt style={{ textAlign: 'center', fontSize: 18 }}>
                Next Q
            </PTxt>
        </Button>
    );
};

export default NextQuestion;
