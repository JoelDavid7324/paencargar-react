/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useContext } from "react";
import { Skeleton } from "../Skeleton/Skeleton";
import { useNavigate } from "react-router-dom";
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
    userLogged,
    editMode,
    setEditMode,
    deleteMode,
    setDeleteMode,
    setEditCardSelected,
    setDeleteCardSelected,
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
          "https://script.googleusercontent.com/macros/echo?user_content_key=fpzuVO4Sl7tz97qy0NlLM_LjHZBMvB7agk86IT82_0r6fcOZQzvtOB0Oviuo41iby7QuV2ComSVHye3yqPmfhbtAmqqRRm2COJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa8CMjJTxE4GugBg4L04ssKm5QWc-uMQD1lSrB1gr6ObSwW3S52q2SkaRop5-JG4aWwkdtMpW4CIIMO0iaY8LWjDWIj876d3oFuhynpbHqv9YF2Cn5Hl8w61Oh9fX6njrfQ&lib=Mt9DcNd5Hayo7C8_pc2MjwwFAR-wyTGep"
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
      return product.Titulo.toLowerCase().includes(
        searchBarContent.toLowerCase()
      );
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
    const whatsappMessage = `Hola, estoy interesado en comprar ${product.Titulo} ${product.Descripcion}`;
    window.open(`https://wa.me/+58468600?text=${whatsappMessage}`);
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

  const navigate = useNavigate();

  const handleCardClick = (product) => {
    if (editMode) {
      setEditCardSelected(product);
      setEditMode(false);
      navigate("/cardEdit");
    } else if (deleteMode) {
      setDeleteCardSelected(product);
      setDeleteMode(false);
      navigate("/cardDelete");
    }
  };

  useEffect(() => {
    const cardContainer = document.querySelector(".cards__container");
    if (userLogged || editMode || deleteMode) {
      const titleElement = document.querySelector(".userLoggedOptionsTitle");
      const height = titleElement.offsetHeight;
      cardContainer.style.marginTop = `${height}px`;
    } else {
      cardContainer.style.marginTop = "0vh";
    }
  }, [deleteMode, editMode, userLogged]);

  return (
    <>
      {userLogged && !editMode && !deleteMode ? (
        <div className="userLoggedOptionsTitle">
          Toque la letra de su nombre para desplegar las opciones
        </div>
      ) : userLogged && editMode ? (
        <div className="userLoggedOptionsTitle">
          Toque la tarjeta del producto que desea editar
        </div>
      ) : userLogged && deleteMode ? (
        <div className="userLoggedOptionsTitle">
          Toque la tarjeta del producto que desea eliminar
        </div>
      ) : (
        ""
      )}
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
            <div
              className="card"
              key={product.id}
              onClick={() => handleCardClick(product)}
            >
              <div className="details">
                <div
                  className="backFromDetails"
                  onClick={(e) => handleToDetailsClick(e)}
                >
                  Volver
                </div>
                <figure className="details__image-container">
                  <img
                    src={`http://pruebas.enqba.com/image/${product.Imagen}`}
                    alt={product.Titulo}
                  />
                </figure>
                <p className="details__product-title">{product.Titulo}</p>
                <p className="details__product-description">
                  {product.Descripcion}
                </p>
                <div className="details__info">{product.Detalles}</div>
              </div>
              <div className="product">
                <figure className="image__container">
                  <img
                    src={`http://pruebas.enqba.com/image/${product.Imagen}`}
                    alt={product.Titulo}
                  />
                </figure>
                <div className="product__footer">
                  <div className="product__footer--name">
                    <h3>{product.Titulo}</h3>
                    <h3>{product.Descripcion}</h3>
                  </div>
                  <div className="product__footer--price">
                    <p>
                      USD: <span>{product.Precio}</span>
                    </p>
                    <p>
                      MLC: <span>{product.MLC}</span>
                    </p>
                    <p>
                      CUP: <span>{"$" + product.CUP}</span>
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
