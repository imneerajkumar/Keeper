import React, { useState } from "react";
import "./Note.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #ccc",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 2),
  },
}));

function Note(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({
    title: props.title,
    content: props.content,
  });

  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleUpdate() {
    props.onUpdate(props.id, note.title, note.content);
    setOpen(false);
  }

  function handleCancel() {
    setOpen(false);
    setNote({
      title: props.title,
      content: props.content,
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  return (
    <div className="note">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="create-note">
            <input
              className="input"
              name="title"
              onChange={handleChange}
              value={note.title}
            />
            <textarea
              name="content"
              className="input"
              onChange={handleChange}
              value={note.content}
              rows={3}
            />
          </form>
          <div className="btn-container">
            <button className="btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </Modal>

      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={() => setOpen(true)} className="upd">
        <EditIcon />
      </button>
      <button onClick={handleDelete} className="del">
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
