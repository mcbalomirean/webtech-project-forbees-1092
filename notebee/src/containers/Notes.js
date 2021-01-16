import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NoteCard from "../components/NoteCard";

const API = process.env.REACT_APP_API_BASEURL;
const config = {
  baseURL: `${API}`,
  withCredentials: true,
};

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(API + "/notes", config).then((result) => {
      setNotes(result.data);
    });
  }, []);

  return (
    <div>
      <h1>My notes</h1>

      <Grid container spacing={4}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4}>
            <NoteCard note={note} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
