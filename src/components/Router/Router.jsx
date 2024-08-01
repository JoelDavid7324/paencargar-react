// AppRoute.js
import { Routes, Route } from "react-router-dom";
import { Header } from "../Header/Header";
import { Card } from "../Card/Card";
import { GeneralContainer } from "../Containers/GeneralContainer";
import { AppProvider } from "../../context/DataProvider";
import { Login } from "../AdminLogin/Login";

export const AppRoute = () => {
  return (
    <AppProvider>
      <Routes>
        <Route
          index
          path="/"
          element={
            <GeneralContainer>
              <Header />
              <Card />
            </GeneralContainer>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppProvider>
  );
};
