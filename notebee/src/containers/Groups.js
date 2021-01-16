import React, { useState, useEffect } from "react";

import GroupCard from "../components/GroupCard";

import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Typography } from "@material-ui/core";

const API = process.env.REACT_APP_API_BASEURL;
const config = {
  baseURL: `${API}`,
  withCredentials: true,
};

export default function Groups() {
  const auth = useAuth();
  const [groups, setGroups] = useState([]);
  const [username, setUsername] = useState([]);

  useEffect(() => {
    axios.get(API + "/groups", config).then((result) => {
      setGroups(result.data);
    });
  }, []);

  async function DeleteGroup(group) {
    const id = group.id;
    await axios.delete(API + "/groups/" + id, config);
    await axios.get(API + "/groups", config).then((result) => {
      setGroups(result.data);
    });
  }

  return (
    <div>
      {auth.user ? (
        groups.map((group) => (
          <GroupCard group={group} id={group.id} DeleteGroup={DeleteGroup} />
        ))
      ) : (
        <Typography variant="h4" align="center" style={{ padding: "10px" }}>
          Please Log in to see your groups!
        </Typography>
      )}
    </div>
  );
}
