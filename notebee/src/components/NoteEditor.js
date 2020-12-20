import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";

const API = process.env.REACT_APP_API_BASEURL;

const rows = 16;

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue, according to Material-UI developers.
    padding: theme.spacing(2),
  },
}));

export default function NoteEditor(props) {
  const classes = useStyles();
  // TODO: consolidate state
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    // There is a reason we are using an arrow function encapsulated into a variable:
    // useEffect asks for a function as a first parameter, and
    // if that function returns anything, it uses that return as a clean-up procedure.
    // Since async methods always return a promise, it would always return a
    // clean-up procedure, which... doesn't work. And is also superfluous.
    // So, we take our function, put it into a variable, then call it that way.
    // This avoids that problem and also lets us use a separate clean-up function
    // if desired.
    const loadSubjects = async () => {
      let results = await axios.get(`${API}/subjects/names`);
      let subjects = results.data.map((subject) => subject.name);
      setSubjects(subjects);
    };

    loadSubjects();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper component="form" className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="titleField"
              label="Title"
              aria-label="Note Title"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="subjectField"
              label="Subject"
              aria-label="Note Subject"
              select
              required
              fullWidth
            >
              {subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="contentsField"
              label="Contents"
              aria-label="Note Contents"
              multiline
              variant="outlined"
              rows={rows}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="keywordsField"
              label="Keywords"
              aria-label="Note Keywords"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="tagsField"
              label="Tags"
              aria-label="Note Tags"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" fullWidth>
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
