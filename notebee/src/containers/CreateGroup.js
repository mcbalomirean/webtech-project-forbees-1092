import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import GroupCard from "../components/GroupCard";
import { useAuth } from "../hooks/useAuth";
import { Typography } from "@material-ui/core";

export default function CreateGroup() {
  const auth = useAuth();
  const API = process.env.REACT_APP_API_BASEURL;
  const config = {
    baseURL: `${API}`,
    withCredentials: true,
  };

  useEffect(() => {
    axios.get(API + "/groups", config).then((result) => {
      setGroups(result.data);
    });
  }, []);

  const [name, setName] = useState("");
  const [groups, setGroups] = useState([]);

  async function addButton(event) {
    await axios.post(API + "/groups/create", { name }, config);

    await axios.get(API + "/groups", config).then((result) => {
      setGroups(result.data);
    });
  }

  async function DeleteGroup(group) {
    const id = group.id;
    await axios.delete(API + "/groups/" + id, config);
    // setIsDeleted(true);
    await axios.get(API + "/groups", config).then((result) => {
      setGroups(result.data);
    });
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

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
