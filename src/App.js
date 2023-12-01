import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import CreateArea from "./components/CreateArea/CreateArea";
import Note from "./components/Note/Note";
import db from "./utils/firebase";
import { useStateValue } from "./utils/StateProvider";
import firebase from "firebase";

function App() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  const [notes, setNotes] = useState([]);
  const [keeps, setKeeps] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("notes")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setNotes(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      setKeeps(notes.filter((note) => note.data.email === user.email));
    }
  }, [user, notes]);

  function addNote(newNote) {
    db.collection("notes").add({
      email: user.email,
      title: newNote.title,
      content: newNote.content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  function updateNote(id, title, content) {
    db.collection("notes").doc(id).update({
      title: title,
      content: content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  function deleteNote(id) {
    db.collection("notes").doc(id).delete();
  }

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Header keeps={keeps} />
          <CreateArea onAdd={addNote} />
          <div className="notes__area">
            {keeps.map((note) => (
              <Note
                key={note.id}
                id={note.id}
                title={note.data.title}
                content={note.data.content}
                onDelete={deleteNote}
                onUpdate={updateNote}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
