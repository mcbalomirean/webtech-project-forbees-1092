import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { API } from "../util/constants";

const maxLength = 2 ** 8 - 1;

const config = {
  baseURL: `${API}/notes`,
  withCredentials: true,
};

const initialFormState = {
  name: "",
};

export default function ShareNoteDialog(props) {
  const history = useHistory();

  const [form, setForm] = useState(initialFormState);

  const handleInputChange = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleInputSave = async () => {
    try {
      if (form.name === "") {
        throw new Error("You must fill in all required fields!");
      }
      if (form.name.length > maxLength) {
        throw new Error("Email too long!");
      }

      await axios.post(`/`, form, config);
      props.handleSuccess("Note shared successfully!");

      //TO CHANGE
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
      aria-label="Share Note"
    >
      <DialogTitle>Share Note</DialogTitle>
      <DialogContent>
        <form autoComplete="off">
          <TextField
            id="nameField"
            name="name"
            label="Name"
            aria-label="Student Email"
            required
            fullWidth
            value={form.name}
            onChange={handleInputChange}
            error={form.name === "" || form.name.length > maxLength}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleInputCancel}>Cancel</Button>
        <Button onClick={handleInputSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
