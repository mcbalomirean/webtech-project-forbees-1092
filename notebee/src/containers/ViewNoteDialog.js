import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import NoteViewer from "../components/NoteViewer";
import axios from "axios";

const API = process.env.REACT_APP_API_BASEURL;
const config = {
  baseURL: `${API}/notes`,
  withCredentials: true,
};

const loadingString = `Loading...`;

export default function CreateNoteDialog(props) {
  const [contentsLoaded, setContentsLoaded] = useState(false);
  const [contents, setContents] = useState("");

  const loadContents = async () => {
    let result = await axios.get(`/${props.note.id}/contents`, config);
    setContents(result.data.contents);
    setContentsLoaded(true);
  };

  const unloadContents = () => {
    setContentsLoaded(false);
    setContents("");
  };

  return (
    <Dialog
      open={props.open}
      onEnter={loadContents}
      onExited={unloadContents}
      onClose={props.handleClose}
      aria-label="View Note"
    >
      <DialogTitle>
        <Typography variant="h6" color="textSecondary">
          {props.note.title} - {props.note.subjectName}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <NoteViewer>{contentsLoaded ? contents : loadingString}</NoteViewer>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
