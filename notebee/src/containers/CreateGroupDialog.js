import React, { useState, useEffect } from "react";
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
import axios from "axios";

const maxLength = 2 ** 8 - 1;

const API = process.env.REACT_APP_API_BASEURL;
const config = {
  baseURL: `${API}/groups`,
  withCredentials: true,
};

const initialFormState = {
  name: "",
};

export default function CreateGroupDialog(props) {
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
        throw new Error("Name too long!");
      }

      await axios.post(`/`, form, config);
      props.handleSuccess("Group added successfully!");

      //TO CHANGE
      // If we're currently viewing our notes, we reload the page so we reload the notes.
      if (history.location.pathname === "/groups") {
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
      aria-label="Create Group"
    >
      <DialogTitle>Create Group</DialogTitle>
      <DialogContent>
        <form autoComplete="off">
          <TextField
            id="nameField"
            name="name"
            label="Name"
            aria-label="Group Name"
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
