import { createContext, useReducer, useMemo } from "react";
import { reducer } from "./reducer";

export const AppContext = createContext();

const initialState = {
    curPage:"Карта",
    tempStatus: 0,
    cardColor: "black",
    cardType: "corner",
    privilegia: "vip",
    cardActive: true,
    cardNumber: 0,
    userName: "Ivan",
    userLastname: "Ivanov",
    userMiddlename: "",
    userEmail:"",
    userBirth: "2002-01-10",
    userGender: "male",
     
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