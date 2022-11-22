import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Card = (props) => {
  const { users, data ,editUser,updateAUser} = props;
  const ref = useRef();
  const administrator = useSelector((state) => state.Admin);
 
  

 

  

  const deleteUser = async (data) => {
    let id = data._id;
    let authToken = localStorage.getItem("authToken");
    await fetch(`http://localhost:5000/api/administration/deleteuser/${id}`, {
      headers: { "auth-token": `${authToken}` },
      method: "DELETE",
    });
    props.showAlert('user deleted successfully...' , 'success')
    users();
  };
  const edituser=(data)=>{
    ref.current.click();
    editUser(data)
  }
  const updateuser = ()=>{
    ref.current.click();
    updateAUser();
    users()
  }

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none "
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        aria-labelledby="exampleModalCenterLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit A User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label htmlFor="recipient-name" className="col-form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="updated-user-name"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="recipient-name" className="col-form-label">
                  User E-Mail
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="updated-user-email"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="recipient-name" className="col-form-label">
                  Date of Joining
                </label>
                <input type="text" className="form-control" id="updated-DOJ" />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={updateuser}
                className="btn btn-info"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 my-3">
        <div className="card" style={{ width: "18rem" }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-end">
              {administrator === "admin" || administrator === "manager" ? (
                <i
                  className="fa fa-duotone fa-pen-to-square mx-1"
                  onClick={() => {
                    edituser(data);
                  }}
                ></i>
              ) : null}
              {administrator === "admin" ? (
                <i
                  className="fa fa-duotone fa-trash mx-1"
                  onClick={() => {
                    deleteUser(data);
                  }}
                ></i>
              ) : null}
            </li>
            <li className="list-group-item list-group-item-action d-flex">
              <div id="edit-user-name"> {data.userName}</div>
            </li>
            <li className="list-group-item list-group-item-action">
              <div id="edit-user-email">{data.userEmail}</div>
            </li>
            <li className="list-group-item list-group-item-action">
              {data.DOJ.slice(0, 10)}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Card;
