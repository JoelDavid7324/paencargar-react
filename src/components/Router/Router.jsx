// AppRoute.js
import { Routes, Route } from "react-router-dom";
import { Header } from "../Header/Header";
import { Card } from "../Card/Card";
import { GeneralContainer } from "../Containers/GeneralContainer";
import { AppProvider } from "../../context/DataProvider";
import { Login } from "../AdminLogin/Login";
import { CardCrudSection } from "../EditSection/CardCrudSection";
import { CreateSection } from "../EditSection/CreateSection";
import { EditSection } from "../EditSection/EditSection";

export const AppRoute = () => {
  return (
    <AppProvider>
      <Routes>
        <Route
          index
          path="/"
          element={
            <GeneralContainer>
              <CardCrudSection />
              <Header />
              <Card />
            </GeneralContainer>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cardCreate" element={<CreateSection />} />
        <Route path="/cardEdit" element={<EditSection />} />
      </Routes>
    </AppProvider>
  );
};
