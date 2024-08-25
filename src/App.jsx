import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Card } from "./components/Card/Card";
import { GeneralContainer } from "./components/Containers/GeneralContainer";
import { AppProvider } from "./context/DataProvider";
import { Login } from "./components/AdminLogin/Login";
import { CardCrudSection } from "./components/EditSection/CardCrudSection";
import { CreateSection } from "./components/EditSection/CreateSection";
import { EditSection } from "./components/EditSection/EditSection";
import { PrivateRoutes, PublicRoutes } from "./components/Router/Router";

function App() {
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
        <Route path={PublicRoutes.LOGIN} element={<Login />} />
        <Route path={PrivateRoutes.CARDCREATE} element={<CreateSection />} />
        <Route path={PrivateRoutes.CARDEDIT} element={<EditSection />} />
        <Route
          path="*"
          element={
            <GeneralContainer>
              <CardCrudSection />
              <Header />
              <Card />
            </GeneralContainer>
          }
        />
      </Routes>
    </AppProvider>
  );
}

export default App;
