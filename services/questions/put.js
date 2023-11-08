import axios from "axios";
import CustomLocalStorage from "../../globalHelperFns/localStorage";
import { CACHE_ANSWERED_QUESTION_IDS_PATH, QUESTIONS_API_DOMAIN } from "../../globalVars";

const localStorage = new CustomLocalStorage();

export async function sendReqToSaveAnsweredQs(questionIds, path = CACHE_ANSWERED_QUESTION_IDS_PATH) {
    try {
        const demoUserId = await localStorage.getData('demoUserId');
        const userId = await localStorage.getData('userId');
        let body = { questionIds: questionIds }
        const serverUrlToSaveAnsweredQs = `${QUESTIONS_API_DOMAIN}/${path}`;

        if(demoUserId){
            body.demoUserId = demoUserId
        } else {
            body.userId = userId;
        };

        const response = await axios.put(serverUrlToSaveAnsweredQs, { ...body });

        if(response.status !== 200){
            throw new Error("Failed to save question ids.")
        }
        
        console.log("From server: ", response)
    } catch (error) {
        console.error("An error has occurred in saving the data on the server: ", error);
    }
}