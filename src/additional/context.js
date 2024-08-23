import { createContext, useReducer, useMemo } from "react";
import { reducer } from "./reducer";

export const AppContext = createContext();

const initialState = {
    curPage:"Карта",
    cardStyle:"blue-default",
    privilegia: "advanced",
    tempStatus: 0,
}

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const actions = useMemo(() => ({
      changePage: (page) => {
        dispatch({ type: 'CHANGE_PAGE', payload: {page: page} });
      },
      changeTempStatus: (status) => {
        dispatch({ type: 'CHANGE_TEMP_STATUS', payload: {status: status} });
      }
    }), [dispatch]);
  
    return (
      <AppContext.Provider value={{ ...state, ...actions }}>
        {children}
      </AppContext.Provider>
    );
  };