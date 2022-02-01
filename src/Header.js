import React from "react";
import { Avatar } from "@material-ui/core";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import jsPDF from "jspdf";
import "./Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ keeps }) {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

  const save = () => {
    const doc = new jsPDF('p', 'pt');
    doc.addFont('helvetica', 'normal')

    doc.text(230, 30, 'Keeper - Your Notes')
    doc.text(0, 40, "_______________________________________________________________________");
    doc.text(60, 60, `User: ${user.displayName}`)
    doc.text(260, 60, `Email-id: ${user.email}`)
    doc.text(0, 70, "_______________________________________________________________________");
    
    var i = 90;
    var c = 1;
    keeps.forEach(note => {
      doc.text(20, i, `${c}. `)
      doc.text(35, i, `Title: ${note.data.title}`)
      doc.text(35, i+15, `Content: ${note.data.content}`)
      i = i + 45;
      c = c + 1;
    });
    
    doc.save("Notes.pdf");
  }
  
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
          <Dropdown.Item onClick={save}>Download</Dropdown.Item>
          <Dropdown.Item onClick={logout}>LogOut</Dropdown.Item>
        </DropdownButton>
      </div>
    </header>
  );
}

export default Header;
