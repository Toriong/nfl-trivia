import { useContext } from "react";
import { TriviaViewDataContext } from "../../../../providers/TriviaViewDataProvider";
import { useMediaQuery } from "react-responsive";
import { Button } from "../../../../globalComponents/buttons";
import { PTxt } from "../../../../globalComponents/customTxts";


const SubmitAnswerBtn = ({ handleOnPress }) => {
    const {
        _selectedAnswer,
    } = useContext(TriviaViewDataContext);
    const isBelow375PxViewPortWidth = useMediaQuery({ query: "(max-width: 375px)" });
    const [, selectedAnswer] = _selectedAnswer;
    let buttonStyle = { marginTop: 40 }

    if (isBelow375PxViewPortWidth) {
        buttonStyle = { marginTop: 10 };
    }

    return <Button
        isDisabled={selectedAnswer.answer === ""}
        dynamicStyles={{
            opacity: selectedAnswer.answer === "" ? .3 : 1,
            backgroundColor: '#69BE28',
            padding: 10,
            borderRadius: 10,
            ...buttonStyle
        }}
        handleOnPress={handleOnPress}
    >
        <PTxt>Submit</PTxt>
    </Button>
};

export default SubmitAnswerBtn;