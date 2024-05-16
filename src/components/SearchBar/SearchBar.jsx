import "./search-bar-style.css";
export const SearchBar = () => {
  return (
    <div className="navbar__findBar">
      <input
        type="text"
        placeholder="Buscar modelos..."
        className="navBar__findBar--input"
      />
      <figure className="navbar__findBar--figure">
        <img src="../../../src/assets/glass.svg" alt="glass" />
      </figure>
    </div>
  );
};
