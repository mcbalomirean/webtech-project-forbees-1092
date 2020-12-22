import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function GroupCard(props) {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const DisplayStudents = () => {
    const API = process.env.REACT_APP_API_BASEURL;
    const id = props.group.id;
    axios.get(API + "/groups/members/" + id).then((result) => {
      setStudents(result.data.students);
      setLoaded(false);
    });
    setIsOpen(!isOpen);
    if (isOpen == false) setStudents([]);
  };

  const DeleteGroup = () => {
    const API = process.env.REACT_APP_API_BASEURL;
    const id = props.group.id;
    axios.delete(API + "/groups/" + id);
    setIsDeleted(true);
  };

  return isDeleted ? null : (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Group: {props.group.name}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={DisplayStudents}>
          See group members
        </Button>
        <Button size="small" onClick={DeleteGroup}>
          Delete Group
        </Button>
      </CardActions>
      {isOpen ? (
        students.map((student) => (
          <Typography>
            {student.email}
            <br />
          </Typography>
        ))
      ) : (
        <Typography> </Typography>
      )}
    </Card>
  );
}
