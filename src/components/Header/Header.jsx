import "./header-style.css";
const images = [
  "../../../src/assets/watch.svg",
  "../../../src/assets/shopping-cart.svg",
];
export const Header = () => {
  return (
    <header className="header">
      <div>
        <p>
          Cell <span className="header__text--orange">xEncargo</span>
        </p>
      </div>
      <div>
        <figure className="header__figure--watch">
          <img src={images[0]} alt="watch img" />
        </figure>
        <figure className="header__figure__figure--car">
          <img src={images[1]} alt="car img" />
        </figure>
      </div>
    </header>
  );
};
