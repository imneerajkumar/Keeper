import React from "react";
import { Avatar } from "@material-ui/core";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import "./Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

  const logout = () => {
    auth
    .signOut()
    .then(() => {
      dispatch({
          type: actionTypes.SET_USER,
          user: null,
      });
    })
    .catch((error) => alert(error.messsage));
  };

  return (
    <header>
      <img className="logo" src="https://image.flaticon.com/icons/png/512/2991/2991161.png" alt="Keeper" />
      <h1>Keeper</h1>
      <div className="userDetails">
        <Avatar src={user?.photoURL} />
        <h4>{user.displayName}</h4>
        <DropdownButton variant="Warning" id="dropdown-basic-button" title="">
          <Dropdown.Item>{user.email}</Dropdown.Item>
          <Dropdown.Item onClick={logout}>LogOut</Dropdown.Item>
        </DropdownButton>
      </div>
    </header>
  );
}

export default Header;
