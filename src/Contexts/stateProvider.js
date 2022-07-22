import React, { createContext, useContext } from "react";
import useAuth from "./useAuth";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const {
    symbolRelation,
    setSymbolRelation,
    loading,
    authenticated,
    handleLogin,
    handleLogout,
  } = useAuth();
  return (
    <StateContext.Provider
      value={{
        symbolRelation,
        setSymbolRelation,
        loading,
        authenticated,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useMarketSymbolState = () => useContext(StateContext);
