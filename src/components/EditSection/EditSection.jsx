import { useState, useContext, useEffect } from "react";
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

  useEffect(() => {
    const h3s = document.querySelectorAll(" [contentEditable='true']");
    h3s.forEach((h3) => {
      const h3name = h3.name;
      if (
        h3.textContent === "" ||
        product[h3name] === "" ||
        h3.textContent.trim() === "<br>"
      ) {
        h3.classList.add("input-empty");
      } else {
        h3.classList.remove("input-empty");
      }
    });
  }, [product]);

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

  const [imageUploaded, setImageUploaded] = useState(
    `http://pruebas.enqba.com/image/${product.Imagen}`
  );

  const handleImageInputChange = () => {
    const fileInput = document.getElementById("fileInput");
    const fileNameSpan = document.getElementById("fileName");
    if (fileInput.files.length) {
      const file = fileInput.files[0];
      fileNameSpan.textContent = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setImageUploaded(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const replaceWhiteSpaces = (string) => string.replace(/\s+/g, "%20");

  const url = `https://script.google.com/macros/s/AKfycbxiWv1Soc2Bz5qgLf7R7gDzf5DolBRMyeEMmi-hplKUqAl6MQ46OCCJdE858mxP1WXA9w/exec?&pg=1&func=Editar&fila=${
    product.id
  }&value=${[
    product.Titulo,
    product.Precio,
    product.Costo,
    product.MLC,
    product.CUP,
    product.Imagen,
    product.Categoria,
    product.Descripcion,
    product.Estado,
    product.Proveedor,
    product.Detalles,
    product.Otro,
  ]}`;
  console.log(replaceWhiteSpaces(url));

  const handleSubmitClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length) {
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append("file", file);

      fetch("https://pruebas.enqba.com/subida/upload.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error("Error en la respuesta de la red");
          }
        })
        .then((responseText) => {
          console.log("Archivo subido correctamente: " + responseText);
          product.Imagen = file.name;

          const url = `https://script.google.com/macros/s/AKfycbxiWv1Soc2Bz5qgLf7R7gDzf5DolBRMyeEMmi-hplKUqAl6MQ46OCCJdE858mxP1WXA9w/exec?&pg=1&func=Editar&fila=${
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
          fetch(url, {
            mode: "no-cors",
          })
            .then((response) => response.text())
            .then((data) => {
              console.log(data);
              navigate("/");
            })
            .catch((error) => console.error(error));
        })
        .catch(() => {
          console.log("Error al subir el archivo");
          product.Imagen = file.name;
        });
    }
  };

  const handleCleanAllClick = () => {
    const product = {
      id: "",
      Titulo: "",
      Precio: "",
      Costo: "",
      MLC: "",
      CUP: "",
      Imagen: "",
      Categoria: "",
      Descripcion: "",
      Estado: "",
      Proveedor: "",
      Detalles: "",
      Otro: "",
    };
    setImageUploaded(null);
    setProduct(product);
  };

  return (
    <>
      <div className="createSectionContainer">
        <h1 className="createSection--title">Editar:</h1>
        <div className="createSectionEditZone">
          <div className="createSection--form">
            <p className="createSection--form__element--name">Costo:</p>
            <input
              type="text"
              className="createSection--form__element createSection--form__coste"
              name="Costo"
              value={product.Costo}
              onChange={handleInputChange}
            />
            <p className="createSection--form__element--name">Imagen:</p>
            <form id="uploadForm" encType="multipart/form-data">
              <input
                type="file"
                onChange={handleImageInputChange}
                id="fileInput"
                name="file"
                required
              ></input>
              <span id="fileName">Seleccione un archivo</span>
            </form>
            <p className="createSection--form__element--name">Categoría:</p>
            <input
              type="text"
              className="createSection--form__element createSection--form__category"
              name="Categoria"
              value={product.Categoria}
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
            <p className="createSection--form__element--name">Otro:</p>
            <input
              type="text"
              className="createSection--form__element createSection--form__otro"
              name="Otro"
              value={product.Otro}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="createSection--cardView">
            {/*//////////////////////////////////////////////////////////*/}
            <div className=" cardCreateSection--container">
              <div
                className="
          product
          cardCreateSectionProduct"
              >
                {imageUploaded ? (
                  <figure className="image__container">
                    <img
                      src={imageUploaded}
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                      alt={product.Titulo}
                    />
                  </figure>
                ) : (
                  <figure
                    className="uploadArchive--figure"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <img src="/assets/document-add.svg" alt="add" />
                  </figure>
                )}
                <div className="product__footer">
                  <div className="product__footer--name">
                    <h3
                      name="Titulo"
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        setProduct({
                          ...product,
                          Titulo: e.target.textContent,
                        });
                      }}
                    >
                      {product.Titulo}
                    </h3>
                    <h3
                      name="Descripcion"
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        setProduct({
                          ...product,
                          Descripcion: e.target.textContent,
                        });
                      }}
                    >
                      {product.Descripcion}
                    </h3>
                  </div>
                  <div className="product__footer--price">
                    <p>
                      USD:{" "}
                      <span
                        name="Precio"
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          setProduct({
                            ...product,
                            Precio: e.target.textContent,
                          });
                        }}
                      >
                        {product.Precio}
                      </span>
                    </p>
                    <p>
                      MLC:{" "}
                      <span
                        name="MLC"
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          setProduct({
                            ...product,
                            MLC: e.target.textContent,
                          });
                        }}
                      >
                        {product.MLC}
                      </span>
                    </p>
                    <p>
                      CUP: <span>{"$"}</span>
                      <span
                        name="CUP"
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                        onBlur={(e) => {
                          setProduct({
                            ...product,
                            CUP: e.target.textContent,
                          });
                        }}
                      >
                        {product.CUP}
                      </span>
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
                <div
                  className="details__info"
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    setProduct({
                      ...product,
                      Detalles: e.target.textContent,
                    });
                  }}
                >
                  {product.Detalles}
                </div>
              </div>
            </div>
          </div>
          <div className="createSection--controls">
            <button
              //onClick={handleSubmitEditClick}
              className="createSection--controls__element"
            >
              Subir Cambios
            </button>
            <button
              className="createSection--controls__element"
              onClick={handleCleanAllClick}
            >
              Limpiar campos
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
    </>
  );
};
