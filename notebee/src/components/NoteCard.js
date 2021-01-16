import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";


const API = process.env.REACT_APP_API_BASEURL;
const config = {
  baseURL: `${API}`,
  withCredentials: true,
};


export default function NoteCard(props) {

  async function Delete() {
    props.DeleteNote(props.note);
  }

  return (
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
        <Button size="small" color="primary">
          View
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
        {/* <Button size="small" color="primary">
          Edit
        </Button> */}
        <Button size="small" color="primary" onClick={Delete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
