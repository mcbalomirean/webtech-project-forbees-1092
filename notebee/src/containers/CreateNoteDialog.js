import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { API } from "../util/constants";

const maxLength = 2 ** 16 - 1;
const rows = 16;

const config = {
  baseURL: `${API}/subjects`,
  withCredentials: true,
};

const initialFormState = {
  title: "",
  subject: "",
  contents: "",
  keywords: "",
  tags: "",
};

export default function CreateNoteDialog(props) {
  const history = useHistory();

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
      let results = await axios.get(`/names`, config);
      let subjects = results.data.map((subject) => subject.name);
      setSubjects(subjects);
    };

    loadSubjects();
  }, []);

  // TODO: consolidate state?
  const [form, setForm] = useState(initialFormState);

  const handleInputChange = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleInputSave = async () => {
    try {
      if (form.title === "" || form.subject === "") {
        throw new Error("You must fill in all required fields!");
      }
      if (form.contents.length > maxLength) {
        throw new Error("Contents too long!");
      }

      await axios.post(`${API}/notes/`, form, config);
      props.handleSuccess("Note added successfully!");

      // If we're currently viewing our notes, we reload the page so we reload the notes.
      if (history.location.pathname === "/notes") {
        history.go(0);
      }

      props.handleClose();
    } catch (error) {
      props.handleError(error.message);
    }
  };

  const handleInputCancel = () => {
    props.handleClose();
  };

  const unloadForm = () => {
    setForm(initialFormState);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleInputCancel}
      onExited={unloadForm}
      aria-label="Create Note"
    >
      <DialogTitle>Create Note</DialogTitle>
      <DialogContent>
        <Grid container component="form" autoComplete="off" spacing={2}>
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
              error={form.title === ""}
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
              error={form.subject === ""}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            {/* TODO: change helper text dynamically */}
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
              error={form.contents.length > maxLength}
              helperText="Supports Markdown notation."
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
              helperText="Separate keywords by commas, e.g.: keyword1, keyword2"
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
              helperText="Separate tags by commas, e.g.: tag1, tag2"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleInputCancel}>Cancel</Button>
        <Button onClick={handleInputSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
