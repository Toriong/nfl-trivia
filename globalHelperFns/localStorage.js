import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';


class CustomLocalStorage {
    isOnWeb = false;
    storage = null;
    
    constructor() {
        this.isOnWeb = Platform.OS === 'web';
        this.storage = this.isOnWeb ? localStorage : AsyncStorage;
    }

    async getData(fieldName) {
        try {
            if(!fieldName){
                throw new Error('`fieldName` must be provided.')
            }

            if (this.isOnWeb) {
                const data = this.storage.getItem(fieldName)

                if(!data){
                    throw new Error(`'${fieldName}' does not exist.`)
                }

                return JSON.parse(data);
            }

            const data = await this.storage.get(fieldName);

            return JSON.parse(data);
        } catch (error) {
            console.error('An error has occurred in local storage data retrieval: ', error)
        }
    }

    async setData(fieldName, data){
        try {
            if(!data){
                throw new Error('Must have a `fieldName` and a `data` to save into local storage.')
            }

            if (this.isOnWeb) {
                this.storage.setItem(fieldName, JSON.stringify(data));
                return;
            }

            await this.storage.setItem(fieldName, JSON.stringify(data));
        } catch(error){
            console.error('An error has occurred saving data into local storage: ', error);
        }
    }
}

export default CustomLocalStorage;