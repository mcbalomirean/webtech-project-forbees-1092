import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import NoteViewer from "../components/NoteViewer";
import { API, loadingString } from "../util/constants";

const config = {
  baseURL: `${API}/notes`,
  withCredentials: true,
};

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
