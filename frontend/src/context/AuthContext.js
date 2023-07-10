import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    console.log(state);
    switch (action.type) {
        case 'LOGIN':
            return {
                isLoggedIn: action.payload
            }
        case 'LOGOUT':
            return {
                isLoggedIn: false
            }
        default: 
            return state
        }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        isLoggedIn: false
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        
        if(user) {
            dispatch({
                type: 'LOGIN',
                payload: user
            })
        }
    }, [])
    console.log('AuthContet state', state)
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider> 
    )
}