import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../hooks/useAuth";
import GroupCard from "../components/GroupCard";
import { API } from "../util/constants";

//Configuration in order to use users' credentials
const config = {
  baseURL: `${API}/groups`,
  withCredentials: true,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 1, 1, 1),
    width: "auto",
  },
}));

export default function Groups() {
  //Used in order to use its hook to see if the user is logged in or not
  const auth = useAuth();
  const classes = useStyles();
  //Hook to store all of the groups
  const [groups, setGroups] = useState([]);

  //saves all the groups form the database when the page loads
  useEffect(() => {
    axios.get("/", config).then((result) => {
      setGroups(result.data);
    });
  }, []);

  //Function which deletes a group then sets the content to the modified one
  async function handleDelete(groupId) {
    await axios.delete(`/${groupId}`, config);
    setGroups(
      groups.filter((group) => {
        return group.id !== groupId;
      })
    );
  }

  //what is shown on the page, which depends if the user is logged in or not
  return (
    <Fragment>
      {auth.user ? (
        <Grid className={classes.root} container spacing={2}>
          {groups.map((group) => (
            <GroupCard
              group={group}
              id={group.id}
              handleDelete={handleDelete}
            />
          ))}
        </Grid>
      ) : (
        <Typography variant="h4" align="center" style={{ padding: "10px" }}>
          Please log in to see your groups!
        </Typography>
      )}
    </Fragment>
  );
}
