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
import { API } from "../util/constants";

const rows = 16;

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue, according to Material-UI developers.
    padding: theme.spacing(2),
  },
}));

export default function NoteEditor(props) {
  const classes = useStyles();
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
  // TODO: consolidate state?
  const [form, setForm] = useState({
    title: "",
    subject: "",
    contents: "",
    keywords: "",
    tags: "",
  });

  const handleInputChange = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper component="form" className={classes.form} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="titleField"
              name="title"
              label="Title"
              aria-label="Note Title"
              required
              fullWidth
              value={form.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="subjectField"
              name="subject"
              label="Subject"
              aria-label="Note Subject"
              select
              required
              fullWidth
              value={form.subject}
              onChange={handleInputChange}
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
              name="contents"
              label="Contents"
              aria-label="Note Contents"
              multiline
              variant="outlined"
              rows={rows}
              fullWidth
              value={form.contents}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="keywordsField"
              name="keywords"
              label="Keywords"
              aria-label="Note Keywords"
              fullWidth
              value={form.keywords}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="tagsField"
              name="tags"
              label="Tags"
              aria-label="Note Tags"
              fullWidth
              value={form.tags}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth>
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
