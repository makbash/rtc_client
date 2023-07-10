import React from 'react';
import { setItem } from 'src/helpers/utils';
import { IUserData } from 'src/api/types/auth';
import { useSockets } from './socket.context';

type State = {
    user: IUserData | null;
    isReady: boolean;
    isAuthenticated: boolean;
};

type Action = {
    type: string;
    payload: IUserData | null;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
    user: null,
    isReady: false,
    isAuthenticated: false,
};

type AuthProviderProps = { children: React.ReactNode };

const AuthContext = React.createContext<
    { authState: State; dispatch: Dispatch } | undefined
>(undefined);

const stateReducer = (authState: State, action: Action) => {
    switch (action.type) {
        case 'SET_USER': {
            setItem('loggedIn', !!action.payload)

            return {
                ...authState,
                user: action.payload,
                isReady: true,
                isAuthenticated: action.payload ? true : false,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, dispatch] = React.useReducer(stateReducer, initialState);
    const value = { authState, dispatch };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

const useAuthState = () => {
    const context = React.useContext(AuthContext);

    if (context) {
        return context;
    }

    throw new Error(`useAuthState must be used within a AuthProvider`);
};

export { AuthProvider, useAuthState };