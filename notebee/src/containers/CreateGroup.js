import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import GroupCard from "../components/GroupCard";
import { useAuth } from "../hooks/useAuth";
import { Typography } from "@material-ui/core";

export default function CreateGroup() {
  //Sets the base URL for requests
  const API = process.env.REACT_APP_API_BASEURL;
  //Used in order to use its hook to see if the user is logged in or not
  const auth = useAuth();
  //Configuration in order to use users' credentials
  const config = {
    baseURL: `${API}`,
    withCredentials: true,
  };

  //saves all the groups form the database when the page loads
  useEffect(() => {
    axios.get(API + "/groups", config).then((result) => {
      setGroups(result.data);
    });
  }, []);

  //hooks used to store the data
  const [name, setName] = useState("");
  const [groups, setGroups] = useState([]);

  //Function to add a group, receives its name
  async function addButton(event) {
    await axios.post(API + "/groups/", { name }, config);

    await axios.get(API + "/groups/", config).then((result) => {
      setGroups(result.data);
    });
  }

  //Function to delete a group by its id
  async function DeleteGroup(group) {
    const id = group.id;
    await axios.delete(API + "/groups/" + id, config);
    await axios.get(API + "/groups", config).then((result) => {
      setGroups(result.data);
    });
  }

  //Function which sets the variable to the input everytime it changes
  function handleNameChange(event) {
    setName(event.target.value);
  }

  //what is shown on the page, which depends if the user is logged in or not
  return (
    <div>
      {auth.user ? (
        <form>
          <br />
          <TextField
            id="outlined-basic"
            label="Group name"
            variant="outlined"
            onChange={handleNameChange}
            style={{ padding: "10px" }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={addButton}
            value="submit"
            disableElevation
            style={{ margin: "10px" }}
          >
            Create Group
          </Button>
          <br />
          <br />
        </form>
      ) : (
        <Typography variant="h4" align="center"></Typography>
      )}

      {auth.user ? (
        groups.map((group) => (
          <GroupCard group={group} id={group.id} DeleteGroup={DeleteGroup} />
        ))
      ) : (
        <Typography variant="h4" align="center" style={{ padding: "10px" }}>
          Please Log in to create your groups!
        </Typography>
      )}
    </div>
  );
}
