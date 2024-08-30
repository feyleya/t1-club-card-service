import { createContext, useReducer, useMemo } from "react";
import { reducer } from "./reducer";

export const AppContext = createContext();

const initialState = {
    curPage:"",
    status: 90,
    cardColor: "black",
    cardType: "corner",
    privilegia: "standart",
    cardActive: true,
    cardNumber: "1234 1234 1234 1234",
    userId: 0,
    userName: "Ivan",
    userLastname: "Ivanov",
    userMiddlename: "",
    userEmail:"",
    userBirth: "2002-01-10",
    userGender: "M",
}

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const actions = useMemo(() => ({
      changePage: (page) => {
        dispatch({ type: 'CHANGE_PAGE', payload: {page: page} });
      },
      updateState: (updates) => {
        dispatch({ type: 'UPDATE_STATE', payload: updates });
    },
    }), [dispatch]);
  
    return (
      <AppContext.Provider value={{ ...state, ...actions }}>
        {children}
      </AppContext.Provider>
    );
  };