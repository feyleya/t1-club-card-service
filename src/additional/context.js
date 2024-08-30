import { createContext, useReducer, useMemo } from "react";
import { reducer } from "./reducer";

export const AppContext = createContext();

const initialState = {
    curPage:"",
    status: 90,
    cardColor: "",
    cardType: "",
    privilegia: "standart",
    cardActive: true,
    cardNumber: "",
    userId: 0,
    userName: "",
    userLastname: "",
    userMiddlename: "",
    userEmail:"",
    userBirth: "",
    userGender: "",
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