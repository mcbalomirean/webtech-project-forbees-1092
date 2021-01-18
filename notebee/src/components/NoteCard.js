import React, { Fragment, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import ViewNoteDialog from "../containers/ViewNoteDialog";
import EditNoteDialog from "../containers/EditNoteDialog";
import ShareNoteDialog from "../containers/ShareNoteDialog";

export default function NoteCard(props) {
  const [noteOpen, setNoteOpen] = useState(false);
  const handleNoteOpen = () => {
    setNoteOpen(true);
  };
  const handleNoteClose = () => {
    setNoteOpen(false);
  };
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = (edited) => {
    if (edited) {
      props.handleUpdate();
    }

    setEditOpen(false);
  };

  const [shareOpen, setShareOpen] = useState(false);
  const handleShareOpen = () => {
    setShareOpen(true);
  };
  const handleShareClose = (shared) => {
    if (shared) {
      props.handleUpdate();
    }

    setShareOpen(false);
  };

  const handleInputDelete = () => {
    props.handleDelete(props.note.id);
  };

  // The notes are showed in a card, from material-ui: https://material-ui.com/components/cards/
  return (
    <Fragment>
      <Card>
        <CardContent>
          <Typography variant="h5">{props.note.title}</Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {props.note.subjectName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Keywords: {props.note.keywords}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Tags: {props.note.tags}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleNoteOpen}>
            View
          </Button>
          <Button size="small" color="primary" onClick={handleEditOpen}>
            Edit
          </Button>
          <Button size="small" color="primary" onClick={handleShareOpen}>
            Share
          </Button>
          <Button size="small" color="primary" onClick={handleInputDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <ViewNoteDialog
        open={noteOpen}
        handleClose={handleNoteClose}
        note={props.note}
      />
      <EditNoteDialog
        open={editOpen}
        handleClose={handleEditClose}
        note={props.note}
        handleSuccess={props.handleSuccess}
        handleError={props.handleError}
      />
      <ShareNoteDialog
        open={shareOpen}
        handleClose={handleShareClose}
        noteId={props.note.id}
        handleSuccess={props.handleSuccess}
        handleError={props.handleError}
      ></ShareNoteDialog>
    </Fragment>
  );
}
