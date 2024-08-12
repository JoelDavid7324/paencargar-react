/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [searchBarContent, setSearchBarContent] = useState("");
  const [userLogged, setUserLogged] = useState(null);
  const [editCardSelected, setEditCardSelected] = useState(null);
  const [deleteCardSelected, setDeleteCardSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  return (
    <AppContext.Provider
      value={{
        allProducts,
        setAllProducts,
        total,
        setTotal,
        countProducts,
        setCountProducts,
        searchBarContent,
        setSearchBarContent,
        userLogged,
        setUserLogged,
        editCardSelected,
        setEditCardSelected,
        deleteCardSelected,
        setDeleteCardSelected,
        editMode,
        setEditMode,
        deleteMode,
        setDeleteMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
