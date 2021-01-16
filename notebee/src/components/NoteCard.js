import React, { Fragment, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import ViewNoteDialog from "../containers/ViewNoteDialog";

export default function NoteCard(props) {
  const [noteOpen, setNoteOpen] = useState(false);
  const handleNoteOpen = () => {
    setNoteOpen(true);
  };
  const handleNoteClose = () => {
    setNoteOpen(false);
  };

  async function Delete() {
    props.DeleteNote(props.note);
  }

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
            Contents: {props.note.contents}
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
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary" onClick={Delete}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <ViewNoteDialog
        open={noteOpen}
        handleClose={handleNoteClose}
        note={props.note}
      />
    </Fragment>
  );
}
