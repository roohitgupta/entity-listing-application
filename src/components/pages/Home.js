import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled  from "styled-components";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, [0]);

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:3003/users");
    setUsers(res.data.reverse());
  };


  const deleteUser = async (id) =>{
    await axios.delete(`http://localhost:3003/users/${id}`);
    alert(`Are You Sure!!`);
    loadUsers();
  }

  
  const sortAsc = ()=> {
    let res =  users.sort((a, b) => a.name.localeCompare(b.name))  
    setUsers([...res]);
}

  const sortDec = ()=> {
    let res =  users.sort((a, b) => a.name.localeCompare(b.name))
    setUsers([...res.reverse()]);
}

const Container = styled.div`
    width:70%;
    margin: auto;
`
const Button = styled.button`
    padding: 6px 15px;
    background-color: darkgrey;
    color: black;
    font-size: 18px;
    font-weight: 600;
`


  return (
    <Container>
        

    <Button onClick={()=> sortAsc()} >Sort Ascending</Button>
    <Button onClick={()=> sortDec()} >Sort Decending</Button>


      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">name</th>
            <th scope="col">username</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
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
