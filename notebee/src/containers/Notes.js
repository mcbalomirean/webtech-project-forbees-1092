import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchAppBar from "../components/SearchAppBar";
import NoteCard from "../components/NoteCard";
import { useAuth } from "../hooks/useAuth";

const API = process.env.REACT_APP_API_BASEURL;
const config = {
  baseURL: `${API}`,
  withCredentials: true,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 1, 1, 1),
  },
}));

export default function Notes(props) {
  const auth = useAuth();
  const classes = useStyles();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(API + "/notes", config).then((result) => {
      setNotes(result.data);
    });
  }, []);


  async function DeleteNote(note) {
    const id = note.id;
    await axios.delete(API + "/notes/" + id, config);
    await axios.get(API + "/notes", config).then((result) => {
      setNotes(result.data);
    });
  }

  return (
    <div>
    {auth.user? (
      <Fragment>
        <SearchAppBar
          name="Notes"
          handleDrawerToggle={props.handleDrawerToggle}
        />
        <Grid className={classes.root} container spacing={2}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4}>
              <NoteCard note={note} DeleteNote={DeleteNote} />
            </Grid>
          ))}
        </Grid>
      </Fragment>
    ) : <h1>Please Log in to see your notes</h1>}
    </div>
  );
}
