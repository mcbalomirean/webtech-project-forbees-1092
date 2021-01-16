import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

const API = process.env.REACT_APP_API_BASEURL;
const config = {
  baseURL: `${API}`,
  withCredentials: true,
};

export default function GroupCard(props) {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  //this is for add button
  const [open, setOpen] = React.useState(false);
  const [removeOpen, setRemoveOpen] = React.useState(false);
  const [name, setName] = useState("");

  const DisplayStudents = () => {
    const id = props.group.id;
    axios.get(API + "/groups/members/" + id).then((result) => {
      setStudents(result.data.students);
    });
    setIsOpen(!isOpen);
    if (isOpen == false) setStudents([]);
  };

  async function Delete() {
    props.DeleteGroup(props.group);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  async function addStudent(event) {
    setOpen(!open);
    const id = props.group.id;
    await axios.post(API + "/groups/add", { email: name, groupId: id }, config);
  }

  async function removeStudent(event) {
    setRemoveOpen(!removeOpen);
    const id = props.group.id;
    await axios.delete(API + "/groups/remove/" + name, { groupId: id }, config);
  }

  function AddForm() {
    return (
      <form style={{ padding: "10px" }}>
        <br />
        <TextField
          id="outlined-basic"
          label="Group name"
          variant="outlined"
          size="small"
          onChange={handleNameChange}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={addStudent}
          value="submit"
          disableElevation
          style={{ margin: "2px 0px 0px 5px" }}
        >
          Add
        </Button>
      </form>
    );
  }

  function RemoveForm() {
    return (
      <form style={{ padding: "10px" }}>
        <br />
        <TextField
          id="outlined-basic"
          label="Group name"
          variant="outlined"
          size="small"
          onChange={handleNameChange}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={removeStudent}
          value="submit"
          disableElevation
          style={{ margin: "2px 0px 0px 5px" }}
        >
          Remove
        </Button>
      </form>
    );
  }

  return (
    <div style={{ padding: "10px" }}>
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
          <Button size="small" onClick={Delete}>
            Delete Group
          </Button>
          <Button size="small" onClick={addStudent}>
            Add student
          </Button>

          <Button size="small" onClick={removeStudent}>
            Remove student
          </Button>
        </CardActions>
        {isOpen ? (
          students.map((student) => (
            <Typography style={{ padding: "10px" }}>
              {student.email}
              <br />
            </Typography>
          ))
        ) : (
          <Typography> </Typography>
        )}

        {open ? AddForm() : <Typography> </Typography>}
        {removeOpen ? RemoveForm() : <Typography> </Typography>}
      </Card>
    </div>
  );
}
