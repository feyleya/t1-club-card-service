import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const AppContext = createContext();

const initialState = {
    phoneNumber: '',
    password: '',
    checkPass: true,
    lastname:'',
}

export const ContextProvider = ({children}) => {
    const [ value, dispatch ] = useReducer(reducer, initialState);

    value.changeField = (field, value) => {
        dispatch({ type: "CHANGE_FIELD", payload: { field, value } });
    };

    value.passCheck = (newvalue, oldvalue) => {
        dispatch({ type: "CHECK_PASSWORD", payload: { newvalue, oldvalue } });
    };

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
    
}