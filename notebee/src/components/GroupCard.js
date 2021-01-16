import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import { API } from "../util/constants";

//styles
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

//Configuration in order to use users' credentials
const config = {
  baseURL: `${API}/groups`,
  withCredentials: true,
};

//GroupCard = Container for groups
export default function GroupCard(props) {
  const classes = useStyles();
  //hook to store the students
  const [students, setStudents] = useState([]);

  //hooks to handle state of pressed buttons
  const [isOpen, setIsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);

  //hook which keeps the input from the text fields
  const [name, setName] = useState("");

  //Function used to display all the students from a group
  const DisplayStudents = () => {
    const id = props.group.id;
    axios.get("/" + id + "/members", config).then((result) => {
      setStudents(result.data.students);
    });
    setIsOpen(!isOpen);
    if (isOpen === false) setStudents([]);
  };

  //Deletes a group
  const handleInputDelete = () => {
    props.handleDelete(props.group.id);
  };

  //Function which sets the variable to the input everytime it changes
  function handleNameChange(event) {
    setName(event.target.value);
  }

  //Functions to handle the buttons' presses, to show/hide the content
  function handleAdd() {
    setAddOpen(!addOpen);
  }
  function handleRemove() {
    setRemoveOpen(!removeOpen);
  }

  //Adds a student to a group by the groups' id and the text field input
  async function addStudent() {
    setAddOpen(!addOpen);
    const id = props.group.id;
    await axios.post("/" + id + "/members/" + name, config);
  }

  //Removes a student from a group by the groups' id and the text field input
  async function removeStudent() {
    setRemoveOpen(!removeOpen);
    const id = props.group.id;
    await axios.delete("/" + id + "/members/" + name, config);
  }

  //Function for displaying the text field and button to add a student to a grpup
  function AddForm() {
    return (
      <form style={{ padding: "10px" }}>
        <br />
        <TextField
          id="outlined-basic"
          label="Student Email"
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

  //Function for displaying the text field and
  //button to remove a student from a group
  function RemoveForm() {
    return (
      <form style={{ padding: "10px" }}>
        <br />
        <TextField
          id="outlined-basic"
          label="Student Email"
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

  //What is shown on the page
  return (
    <div style={{ padding: "10px" }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.group.name}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={DisplayStudents} color="primary">
            View members
          </Button>

          <Button size="small" onClick={handleAdd} color="primary">
            Add
          </Button>

          <Button size="small" onClick={handleRemove} color="primary">
            Remove
          </Button>
          <Button color="secondary" size="small" onClick={handleInputDelete}>
            Delete
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

        {addOpen ? AddForm() : <Typography> </Typography>}
        {removeOpen ? RemoveForm() : <Typography> </Typography>}
      </Card>
    </div>
  );
}
