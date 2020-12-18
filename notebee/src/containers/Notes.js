import React, { useState, Component } from 'react';
import axios from 'axios';

import CardNote from "../components/CardNote";

const API_BASE_URL = process.env.REACT_APP_API_BASEURL;

export default function Notes(){

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(API_BASE_URL + "/notes").then((result) => {
        setNotes(result.data); //TODO here is the problem
    });
  });

    return(
        <div>
          <h1>My notes</h1>
          {notes.map((note) => (
            <CardNote note={note} id={note.id} />
      ))}

        </div>
    ); //;...
}