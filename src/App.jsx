import { Header } from "./components/Header/Header";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Card } from "./components/Card/Card";
import { GeneralContainer } from "./components/Containers/GenaralContainer";
import { CardsContainer } from "./components/Containers/CardsContainer";
import "./App.css";
function App() {
  return (
    <>
      <Header />
      <GeneralContainer>
        <SearchBar />
        <CardsContainer>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </CardsContainer>
      </GeneralContainer>
    </>
  );
}

export default App;
