/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/DataProvider";

import "./header-style.css";
import "./shop-cart.css";
import "./cart-product.css";
export const Header = () => {
  const {
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    setSearchBarContent,
    userLogged,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const deleteElem = (product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id);
    if (existingProduct.quantity > 1) {
      const products = allProducts.map((item) =>
        item.id === product.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCountProducts(countProducts - 1);
      setAllProducts([...products]);
    } else {
      const products = allProducts.filter((item) => item.id !== product.id);
      setCountProducts(countProducts - existingProduct.quantity);
      setAllProducts([...products]);
    }
  };

  const handleKeyUp = (event) => {
    setSearchBarContent(event.target.value);
    console.log(event.target.value);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleCardCrudClick = () => {
    const editSection = document.querySelector(".cardEdit__container");
    const titleCardEditDiv = document.querySelector(".userLoggedOptionsTitle");
    if (!editSection.style.top) {
      editSection.style.top = `calc(-205px + var(--header-height) + ${titleCardEditDiv.offsetHeight}px)`;
    }
    if (
      editSection.style.top ===
      `calc(var(--header-height) + ${titleCardEditDiv.offsetHeight}px)`
    ) {
      editSection.style.top = `calc(-205px + var(--header-height) + ${titleCardEditDiv.offsetHeight}px)`;
    } else {
      editSection.style.top = `calc(var(--header-height) + ${titleCardEditDiv.offsetHeight}px)`;
    }
  };

  return (
    <>
      <header className="header">
        <div className="header__text">
          <p className="header__text--none">
            Cell <span className="header__text--color">xEncargo</span>
          </p>
        </div>

        <div className="navbar__findBar">
          <input
            type="text"
            placeholder="Buscar modelos..."
            className="navBar__findBar--input"
            onChange={handleKeyUp}
            autoComplete="off"
          />
          <figure className="navbar__findBar--figure">
            <img src="/assets/glass.svg" alt="glass" />
          </figure>
        </div>
        <div className="navBar__buttons">
          {!userLogged ? (
            <figure>
              <div
                className="svg--color"
                onClick={handleLoginClick}
              >
              </div>
            </figure>
          ) : (
            <div
              className="userLogged--logo"
              onClick={() => handleCardCrudClick()}
            >
              <p>{userLogged.charAt(0).toUpperCase()}</p>
            </div>
          )}
          <figure>
            <div
              className="svg--color"
              onClick={() => setActive(!active)}
            >
            </div>
            <p>{countProducts}</p>
          </figure>
        </div>
      </header >

      <div
        className={`shopCart-container ${active
          ? "shopCart-container--visible-cart"
          : "shopCart-container--hidden-cart"
          }`}
      >
        <div
          className="shopCart--left"
          onClick={() => setActive(!active)}
        ></div>
        <div className="shopCart--right">
          <div
            className={`shopCart-content ${active
              ? "shopCart-content--visible-cart"
              : "shopCart-content--hidden-cart"
              }`}
          >
            <h2>Carrito</h2>
            <div className="cartProduct">
              {allProducts.length ? (
                allProducts.map((product) => (
                  <div className="cartProduct--container" key={product.id}>
                    <p className="cartProduct--quantity">{product.quantity}</p>
                    <h3>{product.Titulo + " " + product.Descripcion}</h3>
                    <p className="cartProduct__priceUSD">
                      Precio USD: <span>{product.Precio}</span>
                    </p>
                    <p className="cartProduct__priceCUP">
                      Precio MLC: <span>{product.MLC}</span>
                    </p>
                    <button
                      className="cartProduct--delete-product"
                      onClick={() => deleteElem(product)}
                    >
                      X
                    </button>
                  </div>
                ))
              ) : (
                <svg
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--emojione"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M46 11c0 3.3 2.7 6 6 6s6-2.7 6-6s-2.7-6-6-6s-6 2.7-6 6"
                      className="sun"
                    >
                      {" "}
                    </path>{" "}
                    <g className="sun--ray-in">
                      {" "}
                      <path d="M47.8 2.9c-2.5 1.4-4.2 3.6-4.5 6.6c-.1.4.6.6.6.2c.4-2.9 1.9-4.9 4.2-6.2c.4-.2.1-.8-.3-.6">
                        {" "}
                      </path>{" "}
                      <path d="M59.9 13.2c-.9 3.2-2.6 5.5-5.6 6.5c-.4.1-.2.8.2.7c3.2-1 5.2-3.6 6.1-7c0-.4-.6-.6-.7-.2">
                        {" "}
                      </path>{" "}
                      <path d="M44.2 13c.5 2.9 1.7 4.9 4.1 6.4c.4.2.7-.4.3-.6c-2.2-1.5-3.3-3.3-3.8-6c-.1-.4-.7-.2-.6.2">
                        {" "}
                      </path>{" "}
                      <path d="M58.6 6.1c-1-1.7-3-3.8-5.1-3.6c-.4 0-.4.7 0 .7C55.3 3 57.1 5 58 6.5c.3.4.8 0 .6-.4">
                        {" "}
                      </path>{" "}
                    </g>{" "}
                    <g className="sun--ray-out">
                      {" "}
                      <path d="M50.8 21.3c-2.4 0-4.5-.8-6.3-2.5c-.3-.3-.8.2-.5.5c2 1.8 4.1 2.7 6.7 2.7c.5 0 .5-.7.1-.7">
                        {" "}
                      </path>{" "}
                      <path d="M60.4 16.7c-.6 1.5-1.7 3.5-3.2 4.2c-.4.2-.2.8.2.7c1.7-.7 2.9-2.8 3.6-4.5c.1-.4-.4-.8-.6-.4">
                        {" "}
                      </path>{" "}
                      <path d="M43.2 4c-2.3 2.3-1.9 7-.7 9.8c.2.4.7.1.6-.3c-1.1-2.5-1.5-6.9.6-8.9c.2-.4-.2-.9-.5-.6">
                        {" "}
                      </path>{" "}
                      <path d="M58.2 2.6c1.8 1.8 2.6 3.9 2.7 6.5c0 .4.6.4.6 0c0-2.8-.9-5.1-2.9-7c-.3-.3-.7.2-.4.5">
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>
                  <g className="cactus">
                    {" "}
                    <path d="M21.2 35.5c0 1.1.9 1.9 1.9 1.9c1.1 0 1.9-.9 1.9-1.9v-7.7c0-1.1-.9-1.9-1.9-1.9c-1.1 0-1.9.9-1.9 1.9v7.7">
                      {" "}
                    </path>{" "}
                    <path d="M15.5 33.6c-1.1 0-1.9.9-1.9 1.9c0 1.1.9 1.9 1.9 1.9h7.7c1.1 0 1.9-.9 1.9-1.9c0-1.1-.9-1.9-1.9-1.9h-7.7">
                      {" "}
                    </path>{" "}
                  </g>{" "}
                  <path
                    d="M15.8 17c-1.6 0-2.9 1.3-2.9 2.9v32.2c0 2.9 1.3 2.9 2.9 2.9s2.9 0 2.9-2.9V19.9c0-1.6-1.3-2.9-2.9-2.9"
                    className="cactus"
                  >
                    {" "}
                  </path>{" "}
                  <g className="cactus">
                    {" "}
                    <path d="M10.1 42c0 .8-.6 1.4-1.4 1.4c-.8 0-1.4-.6-1.4-1.4v-5.8c0-.8.6-1.4 1.4-1.4c.8 0 1.4.6 1.4 1.4V42">
                      {" "}
                    </path>{" "}
                    <path d="M14.4 40.6c.8 0 1.4.6 1.4 1.4c0 .8-.6 1.4-1.4 1.4H8.7c-.8 0-1.4-.6-1.4-1.4c0-.8.6-1.4 1.4-1.4h5.7">
                      {" "}
                    </path>{" "}
                  </g>{" "}
                  <path
                    d="M10 0.3c-2.7.8-5.4.3-8.2.5c-.2-.6-.4-1.2-.7-1.8c-.3-.7-1.4-.4-1.1.3c.2.5.4 1.1.6 1.6c-.4.1-.9.1-1.3.3c-1.4.4-2.9.8-4.3 1.3c1.3-1.3 2.7-2.5 4.3-3.5c.9-.5 2-.8 3.2-.9h.1c.6-.1 1.3-.1 1.9-.1l1.5 2.1c.4.6 1.5 0 1-.6c-.3-.5-.7-.9-1-1.4c1 0 1.9.1 2.7.1c.8 0 .8-1.2 0-1.2c-1.5 0-3.3-.2-5-.1c.3-.5.7-1 1-1.4c.4-.6-.6-1.3-1-.6c-.5.7-1 1.4-1.5 2.2c-1.1.1-2.2.4-3.1.8c-1.8.9-3.4 2.3-4.9 3.8c1-2 2.2-3.9 3.9-5c3.3-2 6.7-3.1 10.4-2.4c.7.1 1.1-1.1.3-1.2c-3.7-.7-6.5.3-9.8 1.8c.2-.4.5-.9.7-1.3c.4-.7-.6-1.3-1-.6c-.5 1-1.1 2-1.6 3c-1.7 1.2-2.8 3.1-3.8 5c.3-2.1.7-4.2 1.9-5.6c1.6-2 3.4-3.2 5.4-3.9c.7.5 1.5 1 2.2 1.5c.6.4 1.2-.6.6-1.1c-.4-.3-.9-.6-1.3-.9c1.1-.3 2.3-.4 3.6-.4c.8 0 .8-1.2 0-1.2c-1.6 0-3.4 0-4.9.5c-2.3.7-4.2 2.5-5.9 4.2c-2.4 2.4-2.7 6.4-3 9.8c-.3.1-.5.2-.8.3c-.7.2-.4 1.4.3 1.2c.4-.1.8-.3 1.2-.4c2.7 2.2 4.6 2.7 8.1 2.4c3.6-.3 5.7-.9 8.4-3.4c.6-.5-.3-1.4-.8-.9c-1 1-2 1.6-3 2.1c-.4-.6-.8-1.2-1.1-1.9c-.4-.7-1.4 0-1 .6c.3.5.7 1.1 1 1.7c-1 .3-2.1.4-3.4.6c-.6 0-1.2.1-1.9.1c.4-.7.7-1.3 1.1-2c.4-.7-.6-1.3-1-.6c-.5.9-.9 1.7-1.4 2.6c-.6-.1-1.1-.2-1.6-.5c-.7-.4-1.3-.8-1.9-1.3c1.9-.6 3.7-1.2 5.6-1.7c3.5-1 7.1.2 10.7-.8c.6-.7.3-1.9-.4-1.7"
                    className="ball"
                  ></path>{" "}
                </svg>
              )}
            </div>
            <button
              onClick={() => {
                if (allProducts.length > 0) {
                  const cartContents = allProducts
                    .map((product) => {
                      return `${product.Titulo + " " + product.Descripcion} (x${product.quantity
                        })`;
                    })
                    .join(", ");
                  const whatsappMessage = `Hola, me gustaría saber más sobre el ${cartContents}`;
                  window.open(
                    `https://wa.me/+5358468600?text=${whatsappMessage}`
                  );
                }
              }}
              className="shopCart--paid"
            >
              <img
                src="https://seeklogo.com/images/W/whatsapp-icon-logo-6E793ACECD-seeklogo.com.png"
                alt="whatsapp ico "
              />
            </button>
          </div>
          <div
            onClick={() => setActive(!active)}
            className="shopCart--close"
          ></div>
        </div>
      </div>
    </>
  );
};
