import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/DataProvider";
import "./login.css";

export const Login = () => {
  const { setUserLogged } = useContext(AppContext);
  const navigate = useNavigate();

  const [inputUserName, setInputUserName] = useState("");
  const [inputUserPassword, setInputUserPassword] = useState("");

  const [displayName, setDisplayName] = useState(null);

  const [userArray, setUserArray] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxObhK75B26JYFY1q2qHWIBlzC23oQn3eDIhXQ5IEL2tlHbRpifG_M-dDXCq5rXNZPw9w/exec?&pg=2&func=alltodo",
          {
            signal: AbortController.signal,
          }
        );
        const data = await response.json();
        setUserArray(data);
      } catch (error) {
        setError(error);
      }
    };

    if (!userArray && !error) {
      fetchUsers();
    }
  }, [userArray, error]);

  const handleLogin = () => {
    const foundUser = userArray.find((u) => u.user === inputUserName);
    if (!foundUser) {
      console.log("No se ha encontrado el usuario");
    } else if (foundUser.password != inputUserPassword) {
      document.querySelector(".login__inputPassword").value = "";
      document
        .querySelector(".login__inputPassword")
        .setAttribute("placeHolder", "Error en la contraseña");
      setInputUserPassword("");
    } else {
      if (Object.keys(foundUser).length > 0) {
        setUserLogged(foundUser.user);
      } else {
        console.log("se entro tambien ");
        setUserLogged(null);
      }
      navigate("/");
      console.log("El usuario accedió correctamente");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "user") {
      setInputUserName(value);
      const foundUser = userArray.find((u) => u.user === value);
      if (foundUser) {
        setDisplayName(foundUser.user);
      } else {
        setDisplayName("");
      }
    } else if (name === "password") {
      setInputUserPassword(value);
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
            name="user"
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
