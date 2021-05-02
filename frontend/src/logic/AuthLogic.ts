import axios from 'axios';
import { API_BASE_URL } from '../constants';

export default class AuthLogic {
    public static login = async (username: string, password: string): Promise<AuthToken> => {
        try {
            const reqBody = {
                username,
                password
            };
            const resp = await axios.post(API_BASE_URL + 'auth/login/', reqBody);

            return resp && resp.data;
        }
        catch (err) {
            throw err;
        }
    }

    public static signup = async (username: string, password: string, password2: string, email: string): Promise<AuthToken> => {
        const reqBody = {
            username,
            password,
            password2,
            email,
        };
        try {
            const resp = await axios.post(API_BASE_URL + 'auth/register/', reqBody);
            const user = resp && resp.data;
            if (user) {
                const token = AuthLogic.login(user.username, password);
                return token;
            }
            else {
                throw Error('Failed to register user');
            }
        }
        catch (err) {
            throw err;
        }
    }

    public static validateLoginParams = (username: string, password: string) => {
        return !!username.trim() || !!password.trim()
    }

    public static validateSignupParams = (username: string, password: string, password2: string) => {
        return !!username.trim() || !!password.trim() || !!password2.trim()
    }


}