import React, { useState } from "react";
import axios from "axios";
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

const maxLength = 2 ** 8 - 1;

const config = {
  baseURL: `${API}/`,
  withCredentials: true,
};

const initialFormState = {
  email: "",
  groupName: "",
};

export default function ShareNoteDialog(props) {
  const [form, setForm] = useState(initialFormState);

  const handleInputChange = (event) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleInputShare = async () => {
    try {
      if (form.email === "" && form.groupName === "") {
        throw new Error("You must fill in one of the fields!");
      }
      if (form.email.length > maxLength) {
        throw new Error("E-mail too long!");
      }
      if (form.email !== "") {
        await axios.post(
          `notes/${props.noteId}/share/students/${form.email}`,
          null,
          config
        );
      }
      if (form.groupName !== "") {
        await axios.post(
          `notes/${props.noteId}/share/groups/${form.groupName}`,
          null,
          config
        );
      }

      props.handleSuccess("Note shared successfully!");

      props.handleClose(true);
    } catch (error) {
      props.handleError(error.message);
    }
  };

  const handleInputCancel = () => {
    props.handleClose(false);
  };

  const [groups, setGroups] = useState([]);
  const loadGroups = async () => {
    let results = await axios.get("groups", config);
    setGroups(
      results.data.map((group) => {
        return group.name;
      })
    );
  };

  const unloadForm = () => {
    setForm(initialFormState);
    setGroups([]);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleInputCancel}
      onEnter={loadGroups}
      onExited={unloadForm}
      aria-label="Share Note"
    >
      <DialogTitle>Share Note</DialogTitle>
      <DialogContent>
        <Grid container component="form" autoComplete="off" spacing={2}>
          <Grid item xs={12}>
            {" "}
            <TextField
              id="emailField"
              name="email"
              label="E-mail"
              aria-label="Student E-mail"
              fullWidth
              value={form.email}
              onChange={handleInputChange}
              error={
                (form.email === "" && form.groupName === "") ||
                form.email.length > maxLength
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="groupField"
              name="groupName"
              label="Group Name"
              aria-label="Group Name"
              select
              fullWidth
              value={form.groupName}
              onChange={handleInputChange}
              error={form.groupName === "" && form.email === ""}
            >
              {groups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleInputCancel}>Cancel</Button>
        <Button onClick={handleInputShare}>Share</Button>
      </DialogActions>
    </Dialog>
  );
}
