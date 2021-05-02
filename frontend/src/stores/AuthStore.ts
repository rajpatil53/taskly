import axios from 'axios';
import { SetState, GetState, State } from 'zustand';
import createStore from './createStore';

const useAuthStore = (set: SetState<AuthStore>, get: GetState<AuthStore>): AuthStore => ({
    username: '',
    token: null,

    setUsername: (username: string) => set({ username }),
    setToken: (token: AuthToken) => {
        axios.defaults.headers = {
            'Authorization': `Bearer ${token.access}`
        };
        set({ token })
    },
    resetAuth: () => set({ username: '', token: null }),
});

export const usernameSelector = (state: AuthStore) => state.username;
export const tokenSelector = (state: AuthStore) => state.token;
export const setUsernameSelector = (state: AuthStore) => state.setUsername;
export const setTokenSelector = (state: AuthStore) => state.setToken;
export const resetAuthSelector = (state: AuthStore) => state.resetAuth;

export default createStore(useAuthStore, 'auth');

interface AuthStore extends State {
    username: string;
    token: AuthToken | null;

    setUsername: (username: string) => void;
    setToken: (token: AuthToken) => void;
    resetAuth: () => void;
}