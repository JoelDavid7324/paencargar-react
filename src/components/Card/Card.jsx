/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "../Skeleton/Skeleton";
import { useContext } from "react";
import { AppContext } from "../../context/DataProvider";
import "./card-style.css";
import "./card-details.css";

export const Card = () => {
  const {
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    searchBarContent,
  } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const cacheKey = "cardsData";
  const cacheRef = useRef(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setIsLoading(false);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=q36oiatVXdUEe4BkDAY65GFvwS20U6huv7rUXoAE2pJrOHCHJ-tiC_pOR5_gvu_OL7uiv_gglIl1gHiizqdWrwPirxPQTaMAOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa63rTZALqSs4DlodnoXSSJxtW-f0bVkvTatF7fjRD-vB81O14w-uMMfkcloVXALZNtI9TC-efgqAHsPEI1nLYZlbkTmATlLrYzW0R4C0zRj0EH6UNsB8tgZcjxerJjN6Y7aG5hYyu_zwiG-Ptr_29DVZUa2ExguREMADZHlfGOV3QU1skmrvPE2eP8ANzlfPGg&lib=MjHwBxJPAVXwjO4qyNMvubqaW5K_fYpRo"
        );
        const newData = await response.json();
        setData(newData);
        localStorage.setItem(cacheKey, JSON.stringify(newData));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();

    cacheRef.current = cachedData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheRef.current]);

  useEffect(() => {
    const filteredProducts = data.filter((product) => {
      return product.title
        .toLowerCase()
        .includes(searchBarContent.toLowerCase());
    });
    setFilteredData(filteredProducts);
  }, [searchBarContent, data, setFilteredData]);

  const onAddProduct = (product) => {
    const exist = allProducts.find((item) => item.id === product.id);
    if (exist) {
      setAllProducts(
        allProducts.map((item) =>
          item.id === product.id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        )
      );
    } else {
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }
    setCountProducts(countProducts + 1);
  };

  const buyNow = (product) => {
    const whatsappMessage = `Hola, estoy interesado en comprar ${product.title} ${product.description}`;
    window.open(`https://wa.me/+58468600?text=${whatsappMessage}`);
  };

  const randomID = () => {
    return Math.floor(Math.random() * 99999999);
  };

  const handleToDetailsClick = (e) => {
    const card = e.target.closest(".card");
    const detailsDiv = card.querySelector(".details");
    const productDiv = card.querySelector(".product");
    if (!productDiv.style.transform) {
      productDiv.style.transform = "rotateY(0deg)";
    }
    if (!detailsDiv.style.transform) {
      detailsDiv.style.transform = "rotateY(180deg)";
    }
    if (productDiv.style.transform === "rotateY(0deg)") {
      productDiv.style.transform = "rotateY(180deg)";
      detailsDiv.style.transform = "rotateY(360deg)";
    } else {
      productDiv.style.transform = "rotateY(0deg)";
      detailsDiv.style.transform = "rotateY(180deg)";
    }
  };

  return (
    <>
      <div className="cards__container">
        {isLoading ? (
          <>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
          </>
        ) : (
          filteredData.map((product) => (
            <div className="card" key={randomID()}>
              <div className="details">
                <div
                  className="backFromDetails"
                  onClick={(e) => handleToDetailsClick(e)}
                >
                  Volver
                </div>
                <figure className="details__image-container">
                  <img
                    src={`https://paencargar.com/cell/${product.image}`}
                    alt={product.title}
                  />
                </figure>
                <p className="details__product-title">{product.title}</p>
                <p className="details__product-description">
                  {product.description}
                </p>
                <div className="details__info">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quidem in libero id, possimus repudiandae consequuntur eaque,
                  cum, totam eius laboriosam inventore porro deleniti iure
                  itaque odit ad harum ipsum pariatur?
                </div>
              </div>
              <div className="product">
                <figure className="image__container">
                  <img
                    src={`https://paencargar.com/cell/${product.image}`}
                    alt={product.title}
                  />
                </figure>
                <div className="product__footer">
                  <div className="product__footer--name">
                    <h3>{product.title}</h3>
                    <h3>{product.description}</h3>
                  </div>
                  <div className="product__footer--price">
                    <p>
                      USD: <span>{"$" + product.price}</span>
                    </p>
                    <p>
                      MLC: <span>{product.mlc}</span>
                    </p>
                  </div>
                </div>
                <div className="product__buttons">
                  <a onClick={() => buyNow(product)}>
                    <img
                      src="https://seeklogo.com/images/W/whatsapp-icon-logo-6E793ACECD-seeklogo.com.png"
                      alt="whatsapp ico "
                    />
                  </a>
                  <button onClick={() => onAddProduct(product)}>Add +</button>
                </div>
                <div
                  className="toDetails"
                  onClick={(e) => handleToDetailsClick(e)}
                >
                  <span>Detalles</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
