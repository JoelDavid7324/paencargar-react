import "./card-style.css";

export const Card = (meta) => {
  return (
    <div className="product">
      <figure className="image__container">
        <img src={meta.src} alt="img" />
      </figure>
      <div className="product__footer">
        <h1>{meta.info}</h1>
        <div className="price">
          <b>USD: </b> ${meta.usdPrice}
        </div>
        <p className="price">
          <b>CUP: </b> ${meta.cupPrice}
        </p>
        <p className="description">
          <b>Detalles </b> q
        </p>
      </div>
    </div>
  );
};
