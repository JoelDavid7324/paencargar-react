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
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [iDarray4Verify, setIDarray4Verify] = useState([]);

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
        editMode,
        setEditMode,
        deleteMode,
        setDeleteMode,
        iDarray4Verify,
        setIDarray4Verify,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
