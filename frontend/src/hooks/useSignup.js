import { useState, useEffect } from "react";
//import WorkoutDetails from "../components/WorkoutDetails";
//import WorkoutForm from "../components/WorkoutForm";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext()

    const signup = async(email, password) => {
        setIsLoading(true)
        setError(null)

        const res = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await res.json();

        if (!res.ok) {
            setIsLoading(false);
            setError(json.Error);
        }
        if (res.ok) {
            
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({
                type: 'LOGIN',
                payload: json
            })

            setIsLoading(false);
            setError(null);
        }
    }

    return { signup, error, isLoading} 
}
