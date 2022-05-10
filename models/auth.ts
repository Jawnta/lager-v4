import config from '../config/config.json';
import { storeToken, readToken, deleteToken } from './storage';

export const loggedIn = async () => {
    const tokenAndDate = await readToken();
    if (!tokenAndDate)
    {
        return false;
    }
    const day = 1000*60*60*24;
    const notExpired = (new Date().getTime() - tokenAndDate.date) < day;
    return tokenAndDate.token && notExpired;
};

export const register = async (email:string, password:string) => {
    const data = {
        api_key: config.api_key,
        email: email,
        password: password
    };

    const response = await fetch(`${config.base_url}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    });
    return await response.json();

};

export const login = async (email:string, password: string) => {
    const data = {
        api_key: config.api_key,
        email: email,
        password: password
    };

    const response = await fetch(`${config.base_url}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    });
    const result = await response.json();

    if (Object.prototype.hasOwnProperty.call(result, "errors")) {
        return {
            message: result.errors.title,
            description: result.errors.detail,
            type: "danger"
        }
    };
    
    await storeToken(result.data.token);
    
    return {
        message: "Success",
        description: result.data.message,
        type: "success"
    };

};

export const logout = async () => {
    await deleteToken();

};