import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../utils/firebase";
import { useStateValue } from "../../utils/StateProvider";
import { actionTypes } from "../../utils/reducer";

function Login() {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue();
  const year = new Date().getFullYear();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.messsage));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={process.env.PUBLIC_URL + "/light-bulb.png"} alt="Keeper" />

        <div className="login__text">
          <h1>Keeper</h1>
          <p>Make your Notes. Anytime, Anywhere.</p>
        </div>

        <Button onClick={signIn}>Sign In With Google</Button>

        <p className="copyright">{year}ⓒ Copyright imneeraj_kumar</p>
      </div>
    </div>
  );
}

export default Login;
