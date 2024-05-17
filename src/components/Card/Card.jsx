import "./card-style.css";

export const Card = () => {
  return (
    <div className="product">
      <figure className="image__container">
        <img src="/src/assets/cell1.jpg" alt="img" />
      </figure>
      <div className="product__footer">
        <h2>Redmi bla bla bla </h2>
        <p>
          USD: <span>$122</span>
        </p>
        <p>
          CUP: <span>$1234</span>
        </p>
      </div>
      <div className="product__buttons">
        <a href="#">Detalles</a>
        <button>Add +</button>
      </div>
    </div>
  );
};
