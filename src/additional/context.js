import { createContext, useReducer, useMemo } from "react";
import { reducer } from "./reducer";

export const AppContext = createContext();

const initialState = {
    isAuthorized: false,
    curPage:"Карта",
    cardStyle:"black-default",
    privilegia: "vip",
}

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const actions = useMemo(() => ({
      login: () => {
        dispatch({ type: 'LOGIN' });
      },
      logout: () => {
        dispatch({ type: 'LOGOUT' });
      },
      changePage: (page) => {
        dispatch({ type: 'CHANGE_PAGE', payload: {page: page} });
      },
    }), [dispatch]);
  
    return (
      <AppContext.Provider value={{ ...state, ...actions }}>
        {children}
      </AppContext.Provider>
    );
  };