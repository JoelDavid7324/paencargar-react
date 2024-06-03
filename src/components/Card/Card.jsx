/* eslint-disable react/prop-types */
import data from "/src/components/products.json";
import "./card-style.css";

export const Card = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id);
    if (existingProduct) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCountProducts(countProducts + product.quantity);
      setAllProducts([...products]);
    } else {
      setCountProducts(countProducts + 1);
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }
  };
  return (
    <div className="cards__container">
      {data.map((product) => (
        <div className="product" key={product.id}>
          <figure className="image__container">
            <img
              src={`/public/assets/images/${product.src}`}
              alt={product.name}
            />
          </figure>
          <div className="product__footer">
            <div className="product__footer--name">
              <h3>{product.name}</h3>
            </div>
            <p>
              USD: <span>{product.priceUSD}</span>
            </p>
            <p>
              CUP: <span>{product.priceCUP}</span>
            </p>
          </div>
          <div className="product__buttons">
            <a href="#">Detalles</a>
            <button onClick={() => onAddProduct(product)}>Add +</button>
          </div>
        </div>
      ))}
    </div>
  );
};
