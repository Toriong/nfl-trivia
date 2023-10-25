import { Alert, Platform } from "react-native";


export function customAlert(txt){
    if(Platform.OS === 'web'){
        alert(txt);
        return;
    }

    Alert.alert(txt);
}