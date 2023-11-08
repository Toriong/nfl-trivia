import React, { useContext, useEffect } from 'react';
import MainPresentation from './MainPresentation';
import { TriviaBusinessDataContext } from '../../providers/TriviaBusinessDataProvider';
import { sendReqToSaveAnsweredQs } from '../../services/questions/put';


function MainContainer() {
    const { _willSendReqToServerToSaveAnsweredQs, _questionsToDisplayOntoUI } = useContext(TriviaBusinessDataContext);
    const [willSendReqToServertoSaveAnweredQs, setWillSendReqToServertoSaveAnweredQs] = _willSendReqToServerToSaveAnsweredQs;
    const [questionsToDisplayOntoUI, ] = _questionsToDisplayOntoUI;
    
    useEffect(() => {
        let questionIdsToSaveOnServer = questionsToDisplayOntoUI.filter(question => question?.selectedAnswer);
        questionIdsToSaveOnServer = questionIdsToSaveOnServer?.length ? questionIdsToSaveOnServer.map(({ _id }) => _id) : questionIdsToSaveOnServer 
        
        if (willSendReqToServertoSaveAnweredQs && questionIdsToSaveOnServer?.length) {
            console.log("sending request...")
            sendReqToSaveAnsweredQs(questionIdsToSaveOnServer);
            setWillSendReqToServertoSaveAnweredQs(false);
        }
    }, [willSendReqToServertoSaveAnweredQs])

    return <MainPresentation />;
}

export default MainContainer;
