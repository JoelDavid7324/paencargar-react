import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const producto = Data;
    /*aqui va el json */ setProductos(producto);
  }, []);
  const value = { productos: [productos] };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
