import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import UserCard from "./UserCard";
const Users = (props) => {
  const {showAlert} = props;
  const [data, setData] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [newdata , setNewData] = useState([]);
  let [date , setDate] = useState();

  let navigate = useNavigate();
 
  let administrator = useSelector((state) => state.Admin);
  if (!administrator) {
    navigate("/");
  }
 
  useEffect(() => {
    users();
    if (administrator === "admin") {
      userRequest();
    }
     /*eslint-disable */
  }, []);   
  /*eslint-enable */

  const userRequest = async () => {
    let authToken = localStorage.getItem("authToken");
    const response = await fetch(
      "http://localhost:5000/api/administration/user/allrequestuser",
      {
        method: "GET",
        headers: { "auth-token": `${authToken}` },
      }
    );
    const json = await response.json();
    setUserRequests(json.userRequests);
  };

  const users = async () => {
    const response = await fetch(
      "http://localhost:5000/api/administration/getallusers",
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setData(json);
  };

  const editUser = (data) => {
    console.log(data);
    setNewData(data);
    document.getElementById("updated-user-name").value = data.userName;
    document.getElementById("updated-user-email").value = data.userEmail;
    document.getElementById("updated-DOJ").value = data.DOJ.slice(0,10);
    setDate(data.DOJ.slice(10));

  };

  const updateAUser = async () => {
    let updatedUserName = document.getElementById("updated-user-name").value;
    let updatedUserEmail = document.getElementById("updated-user-email").value;
    let updatedUserDOJ = document.getElementById("updated-DOJ").value;
    console.log(date)
    const newDt = updatedUserDOJ + date;
    let updatedUser = {
      userName: updatedUserName,
      userEmail: updatedUserEmail,
      DOJ : newDt
    };
    console.log(newdata);
    let authToken = localStorage.getItem("authToken");
    let id1 = newdata._id;
    await fetch(`http://localhost:5000/api/administration/edituser/${id1}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": `${authToken}`,
      },
      body: JSON.stringify(updatedUser),
    });
   
    users();
    showAlert('User Updated successfully...' , 'success')
  };

  const addRequestedUser = async (data) => {
    let userName = data.userRequestName;
    let userEmail = data.userRequestEmail;
    let password = data.userRequestpassword;

    const response = await fetch(
      "http://localhost:5000/api/administration/user/signup",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ userName, userEmail, password }),
      }
    );
    const json = await response.json();
    if(json.erros){
      showAlert('Internal server error...'  , 'danger');
    }else{
      showAlert('User Added Successfully...' , 'success')
    }
    
    users();
    userRequest();
    deleteRequestedUser(data);
  };

  const deleteRequestedUser = async (element) => {
    let id = element._id;
    let authToken = localStorage.getItem("authToken");
    await fetch(
      `http://localhost:5000/api/administration/user/deleteuserrequest/${id}`,
      {
        method: "DELETE",
        headers: { "auth-token": `${authToken}` },
      }
    );
  
    userRequest();
  };

  return (
    <div>
      <section className="container my-3">
        <div className="section">
          <div className="heading">
            <h1>List of Users </h1>
          </div>
          <div className="line"></div>

          <div className="content">
            <div className="row">
              {data.map((element) => {
                return <Card editUser={editUser} data={element} updateAUser={updateAUser} showAlert={showAlert} users={users} />;
              })}
            </div>
          </div>
        </div>
      </section>
      {administrator === "admin" && (
        <div className=" container my-3 user-requests">
          <div className="section">
            <h2>User requests will appear here </h2>
            <ul class="list-group">
              {userRequests.map((element) => {
                return (
                  <UserCard
                    element={element}
                    addRequestedUser={addRequestedUser}
                    deleteRequestedUser={deleteRequestedUser}
                    showAlert={showAlert}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
