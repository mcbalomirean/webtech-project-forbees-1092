import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchAppBar from "../components/SearchAppBar";
import NoteCard from "../components/NoteCard";
import { useAuth } from "../hooks/useAuth";
import { Typography } from "@material-ui/core";

const API = process.env.REACT_APP_API_BASEURL;

// In order to use authentication
const config = {
  baseURL: `${API}/notes`,
  withCredentials: true,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 1, 1, 1),
    width: "auto",
  },
}));

export default function Notes(props) {
  // Logged in or not
  const auth = useAuth();
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Load notes from db
  useEffect(() => {
    axios.get("/", config).then((result) => {
      setNotes(result.data);
    });
  }, []);

  // Delete note function based on id
  async function handleDelete(noteId) {
    await axios.delete(`/${noteId}`, config);
    setNotes(
      notes.filter((note) => {
        return note.id !== noteId;
      })
    );
  }

  const handleSearchBarChange = (value) => {
    if (value === "") {
      setFilteredNotes([]);
    } else {
      setFilteredNotes(
        notes.filter((note) => {
          return note.keywords.includes(value) || note.tags.includes(value);
        })
      );
    }
  };

  // We check if the user is authenticated; if he is not, show a message
  return (
    <Fragment>
      <SearchAppBar
        name="Notes"
        handleDrawerToggle={props.handleDrawerToggle}
        handleSearchBarChange={handleSearchBarChange}
      />
      {auth.user ? (
        <Grid className={classes.root} container spacing={2}>
          {filteredNotes.length > 0
            ? filteredNotes.map((note) => (
                <Grid item xs={12} sm={6} md={3} key={note.id}>
                  <NoteCard note={note} handleDelete={handleDelete} />
                </Grid>
              ))
            : notes.map((note) => (
                <Grid item xs={12} sm={6} md={3} key={note.id}>
                  <NoteCard note={note} handleDelete={handleDelete} />
                </Grid>
              ))}
        </Grid>
      ) : (
        <Typography variant="h4" align="center" style={{ padding: "10px" }}>
          Please log in to see your notes!
        </Typography>
      )}
    </Fragment>
  );
}
