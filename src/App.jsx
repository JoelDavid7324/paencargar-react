import { Header } from "./components/Header/Header";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Card } from "./components/Card/Card";
import "./App.css";
function App() {
  return (
    <>
      <Header />
      <div className="general__container">
        <SearchBar />
        <div className="cards__container">
          <Card />
        </div>
      </div>
    </>
  );
}

export default App;
