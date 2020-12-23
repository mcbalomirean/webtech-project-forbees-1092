import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import GroupCard from "../components/GroupCard";

export default function CreateGroup() {
  const API = process.env.REACT_APP_API_BASEURL;
  useEffect(() => {
    axios.get(API + "/groups").then((result) => {
      setGroups(result.data);
    });
  }, []);

  const [name, setName] = useState("");
  const [groups, setGroups] = useState([]);

  async function addButton(event) {
    await axios.post(API + "/groups/create", { name });

    await axios.get(API + "/groups").then((result) => {
      setGroups(result.data);
    });
  }

  async function DeleteGroup(group) {
    const id = group.id;
    await axios.delete(API + "/groups/" + id);
    // setIsDeleted(true);
    await axios.get(API + "/groups").then((result) => {
      setGroups(result.data);
    });
  }
  function handleNameChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <br />
        <TextField
          id="outlined-basic"
          label="Group name"
          variant="outlined"
          onChange={handleNameChange}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={addButton}
          value="submit"
          disableElevation
        >
          Create Group
        </Button>
        <br />
        <br />
      </form>

      {groups.map((group) => (
        <GroupCard group={group} id={group.id} DeleteGroup={DeleteGroup} />
      ))}
    </div>
  );
}
