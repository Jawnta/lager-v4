import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token:string) => {
    try {
        const tokenAndDate = {
            token: token,
            date: new Date().getTime()
        };
        const jsonValue = JSON.stringify(tokenAndDate);

        await AsyncStorage.setItem('@token', jsonValue)

    } catch (e) {
        //error
    }
};

export const readToken = async (): Promise<any> => {
    return new Promise<string | null>(async (resolve, reject) => {
        try {
            const jsonValue = await AsyncStorage.getItem('@token');
            resolve(jsonValue != null ? JSON.parse(jsonValue) : null);
    
        } catch (e){
            //error
        }
        
    })

};


export const deleteToken = async () => {
    await AsyncStorage.removeItem('@token');
}