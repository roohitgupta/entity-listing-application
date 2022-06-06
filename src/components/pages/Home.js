import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled  from "styled-components";

const Home = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, [0]);

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:3003/users");
    setUser(res.data.reverse());
  };


  const deleteUser = async (id) =>{
    await axios.delete(`http://localhost:3003/users/${id}`);
    alert(`Are You Sure!!`);
    loadUsers();
  }
const Container = styled.div`
    width:70%;
    margin: auto;
`

  return (
    <Container>
 
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                  <Link to={`/users/${user.id}`} className="btn btn-primary">View</Link>
                  <Link to={`/users/edit/${user.id}`} className="btn btn-outline-primary mr-2">Edit</Link>
                  <Link to={"/"} className="btn btn-danger" onClick={()=> deleteUser(user.id)}>Delete</Link>
              </td>
            </tr>)
          )};
        </tbody>
      </table>
    </Container>
  );
};

export default Home;
