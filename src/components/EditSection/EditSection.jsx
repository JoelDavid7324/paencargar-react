import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/DataProvider";
export const EditSection = () => {
  const { editCardSelected } = useContext(AppContext);

  const [product, setProduct] = useState({
    id: editCardSelected.id,
    Titulo: editCardSelected.Titulo,
    Precio: editCardSelected.Precio,
    Costo: editCardSelected.Costo,
    MLC: editCardSelected.MLC,
    CUP: editCardSelected.CUP,
    Imagen: editCardSelected.Imagen,
    Categoria: editCardSelected.Categoria,
    Descripcion: editCardSelected.Descripcion,
    Estado: editCardSelected.Estado,
    Proveedor: editCardSelected.Proveedor,
    Detalles: editCardSelected.Detalles,
    Otro: editCardSelected.Otro,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleToDetailsClick = () => {
    const productDiv = document.querySelector(".cardCreateSectionProduct");
    const detailsDiv = document.querySelector(".cardCreateSectionDetails");
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

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSubmitEditClick = () => {
    const url = `https://script.google.com/macros/s/AKfycbxiWv1Soc2Bz5qgLf7R7gDzf5DolBRMyeEMmi-hplKUqAl6MQ46OCCJdE858mxP1WXA9w/exec?pg=1&func=Editar&fila=${
      product.id
    }&value=${
      product.Titulo +
      "," +
      product.Precio +
      "," +
      product.Costo +
      "," +
      product.MLC +
      "," +
      product.CUP +
      "," +
      product.Imagen +
      "," +
      product.Categoria +
      "," +
      product.Descripcion +
      "," +
      product.Estado +
      "," +
      product.Proveedor +
      "," +
      product.Detalles +
      "," +
      product.Otro
    }`;
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="createSectionContainer">
      <h1 className="createSection--title">Editar:</h1>
      <div className="createSectionEditZone">
        <div className="createSection--form">
          <p className="createSection--form__element--name">Id:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__id"
            name="id"
            value={product.id}
            onChange={handleInputChange}
          />
          <p className="createSection--form__element--name">Nombre:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__title"
            name="Titulo"
            value={product.Titulo}
            onChange={handleInputChange}
          />
          <p className="createSection--form__element--name">Precio:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__price"
            name="Precio"
            value={product.Precio}
            onChange={handleInputChange}
          />
          <p className="createSection--form__element--name">Costo de compra:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__coste"
            name="Costo"
            value={product.Costo}
            onChange={handleInputChange}
          />
          <p className="createSection--form__element--name">Precio en mlc:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__mlc"
            name="MLC"
            value={product.MLC}
            onChange={handleInputChange}
          />
          <p className="createSection--form__element--name">Precio en cup:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__cup"
            name="CUP"
            value={product.CUP}
            onChange={handleInputChange}
          />
          <p className="createSection--form__element--name">Imagen:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__image"
            name="Imagen"
            value={product.Imagen}
            onChange={handleInputChange}
          />
          <p className="createSection--form__element--name">Categoría:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__category"
            name="Categoria"
            value={product.Categoria}
            onChange={handleInputChange}
          />
          <p className="createSection--form__element--name">Descripción:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__description"
            name="Descripcion"
            value={product.Descripcion}
            onChange={handleInputChange}
          />
          <p className="createSection--form__element--name">Estado:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__estado"
            name="Estado"
            value={product.Estado}
            onChange={handleInputChange}
          />
          <p className="createSection--form__element--name">Prov:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__prov"
            name="Proveedor"
            value={product.Proveedor}
            onChange={handleInputChange}
          ></input>
          <p className="createSection--form__element--name">Detalles:</p>
          <input
            type="text"
            className="createSection--form__element createSection--form__detalles"
            name="Detalles"
            value={product.Detalles}
            onChange={handleInputChange}
          ></input>
        </div>
        <figure className="createSection--form__goDown">
          <img
            src="https://cdn.icon-icons.com/icons2/1673/PNG/512/arrowiosdownwardoutline_110713.png"
            alt="down"
          />
        </figure>
        <div className="createSection--cardView">
          {/*//////////////////////////////////////////////////////////*/}
          <div className=" cardCreateSection--container">
            <div
              className="
          product
          cardCreateSectionProduct"
            >
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
                <a>
                  <img
                    src="https://seeklogo.com/images/W/whatsapp-icon-logo-6E793ACECD-seeklogo.com.png"
                    alt="whatsapp ico "
                  />
                </a>
                <button>Add +</button>
              </div>
              <div onClick={handleToDetailsClick} className="toDetails">
                <span>Detalles</span>
              </div>
            </div>
            {/*/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-*/}
            <div className="details cardCreateSectionDetails">
              <div className="backFromDetails" onClick={handleToDetailsClick}>
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
          </div>
          <div className="createSection--controls">
            <button className="createSection--controls__element">
              Limpiar campos
            </button>
            <button
              onClick={handleSubmitEditClick}
              className="createSection--controls__element"
            >
              Subir Cambios
            </button>
            <button
              className="createSection--controls__element"
              onClick={handleBackClick}
            >
              Atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
