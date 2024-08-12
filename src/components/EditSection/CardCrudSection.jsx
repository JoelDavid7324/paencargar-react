import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/DataProvider";
import "./cardCrud.css";
// eslint-disable-next-line react/prop-types
export const CardCrudSection = () => {
  const { setUserLogged, setEditMode, setDeleteMode } = useContext(AppContext);

  const navigate = useNavigate();

  const handleCardEditClick = () => {
    const editSection = document.querySelector(".cardEdit__container");
    if (!editSection.style.top) {
      editSection.style.top = "-150px";
    }
    if (editSection.style.top === "var(--header-height)") {
      editSection.style.top = "-150px";
    } else {
      editSection.style.top = "var(--header-height)";
    }
  };

  const handleHowToUseClick = () => {
    const front = document.querySelector(".cardEdit--front");
    const back = document.querySelector(".cardEdit--back");
    if (!front.style.transform) {
      front.style.transform = "rotateY(0deg)";
    }
    if (!back.style.transform) {
      back.style.transform = "rotateY(180deg)";
    }
    if (front.style.transform === "rotateY(0deg)") {
      front.style.transform = "rotateY(180deg)";
      back.style.transform = "rotateY(360deg)";
    } else {
      front.style.transform = "rotateY(0deg)";
      back.style.transform = "rotateY(180deg)";
    }
  };
  const handleLogoutClick = () => {
    handleCardEditClick();
    setUserLogged(null);
  };
  const handleCreateSectionClick = () => {
    navigate("/cardCreate");
  };
  return (
    <div className="cardEdit__container">
      <div className="cardEdit__front_back cardEdit--front">
        <div className="carEdit__textSection">
          <div className="cardEdit__title">Opciones de edición:</div>
          <div
            onClick={() => handleHowToUseClick()}
            className="cardEdit--howToUse"
          >
            ?
          </div>
        </div>
        <div className="cardEdit__groupButtons">
          <button
            onClick={handleCreateSectionClick}
            className="cardEdit__button groupButtons--create"
          >
            Crear
          </button>
          <button
            onClick={() => setEditMode(true)}
            className="cardEdit__button groupButtons--update"
          >
            Editar
          </button>
          <button
            onClick={() => setDeleteMode(true)}
            className="cardEdit__button groupButtons--delete"
          >
            Eliminar
          </button>
        </div>
        <button
          className="cardEdit__button cardEdit__logout"
          onClick={() => handleLogoutClick()}
        >
          Cerrar sesión
        </button>
        <figure
          onClick={() => handleCardEditClick()}
          className="cardEdit__button cardEdit__close"
        >
          <img
            src="https://cdn.icon-icons.com/icons2/1673/PNG/512/arrowiosdownwardoutline_110713.png"
            alt="up"
          />
        </figure>
      </div>
      <div className="cardEdit__front_back cardEdit--back">
        <div>
          <h4>Instrucciones:</h4>
          <p>
            Primero selecione la opción que desea ejecutar y en caso de ser
            necesario, seleccione la tarjeta objetivo.
          </p>
        </div>
        <button
          onClick={() => handleHowToUseClick()}
          className="cardEdit--back__off"
        >
          Volver
        </button>
      </div>
    </div>
  );
};
