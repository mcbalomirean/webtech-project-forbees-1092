import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


import CardNote from "../components/NoteCard";

const API = process.env.REACT_APP_API_BASEURL;

const useStyles = makeStyles({
  
  gridContainer: {
    paddingLeft: "30px",
    paddingRight: "30px"
  }
});

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get(API + "/notes").then((result) => {
      setNotes(result.data);
    });
  }, []);

  return (
    <div>
      <h1>My notes</h1>

      <Grid container spacing={4} className={classes.gridContainer}>
      {notes.map((note) => (
        <Grid item xs={12} sm={6} md={4}>
          <CardNote note={note} id={note.id} />
        </Grid>
      ))}
      </Grid>
      
    </div>
  );
}
