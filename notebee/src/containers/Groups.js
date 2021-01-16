import React, { useState, useEffect } from "react";
import GroupCard from "../components/GroupCard";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Typography } from "@material-ui/core";

//Sets the base URL for requests
const API = process.env.REACT_APP_API_BASEURL;

//Configuration in order to use users' credentials
const config = {
  baseURL: `${API}`,
  withCredentials: true,
};

export default function Groups() {
  //Used in order to use its hook to see if the user is logged in or not
  const auth = useAuth();
  //Hook to store all of the groups
  const [groups, setGroups] = useState([]);

  //saves all the groups form the database when the page loads
  useEffect(() => {
    axios.get(API + "/groups", config).then((result) => {
      setGroups(result.data);
    });
  }, []);

  //Function which deletes a group then sets the content to the modified one
  async function DeleteGroup(group) {
    const id = group.id;
    await axios.delete(API + "/groups/" + id, config);
    await axios.get(API + "/groups", config).then((result) => {
      setGroups(result.data);
    });
  }

  //what is shown on the page, which depends if the user is logged in or not
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
