import React, { useState, useEffect } from "react";

import GroupCard from "../components/GroupCard";

import axios from "axios";

const API = process.env.REACT_APP_API_BASEURL;

export default function Groups() {
  //assignments: []
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(API + "/groups").then((result) => {
      // axios.get("/groups").then((result) => {
      setGroups(result.data.results);
    });
  }, []);

  return (
    <div>
      <h1>My groups</h1>
      {groups.map((group) => (
        <GroupCard group={group} id={group.id} />
      ))}
    </div>
  );
}
