import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/DataProvider";
import "./login.css";

export const Login = () => {
  const { setUserLogged } = useContext(AppContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const users = [
    { name: "chicho", password: "12345" },
    { name: "hola", password: "67890" },
    { name: "pancho", password: "12345" },
    { name: "hi", password: "67890" },
  ];

  const handleLogin = () => {
    const foundUser = users.find((u) => u.name === username);
    if (!foundUser) {
      console.log("No se ha encontrado el usuario");
    } else if (foundUser.password !== password) {
      document.querySelector(".login__inputPassword").value = "";
      document
        .querySelector(".login__inputPassword")
        .setAttribute("placeHolder", "Error en la contraseña");
      console.log("Problemas con la contraseña");
    } else {
      if (Object.keys(foundUser).length > 0) {
        // Verifica si el objeto no es vacío
        setUserLogged(foundUser.name);
      } else {
        setUserLogged(null); // Si el objeto es vacío, setea userLogged a null
      }
      navigate("/");
      console.log("El usuario accedió correctamente");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "name") {
      setUsername(value);
      const foundUser = users.find((u) => u.name === value);
      if (foundUser) {
        setDisplayName(foundUser.name);
      } else {
        setDisplayName("");
      }
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const contact = () => {
    const whatsappMessage = "Hola, he olvidado mi contraseña de administración";
    window.open(`https://wa.me/+58468600?text=${whatsappMessage}`);
  };

  return (
    <div className="login-page__container">
      <div className="login__container">
        <h1 className="login__title">Bienvenido</h1>
        <div className="login__user-name">{displayName}</div>
        <div className="login__input-container">
          <p className="login__input--text">Nombre</p>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            className="login__input"
          />
        </div>
        <div className="login__input-container">
          <p className="login__input--text">Contraseña</p>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            className="login__input login__inputPassword"
          />
        </div>
        <p className="login__help">
          ¿Olvidó la contraseña?{" "}
          <span onClick={contact}>Contacte al soporte técnico</span>
        </p>
        <button onClick={handleLogin} className="login__button">
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};
