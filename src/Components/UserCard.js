import React from "react";

const UserCard = (props) => {
  const { element, addRequestedUser, deleteRequestedUser , showAlert } = props;

  return (
    <li class="list-group-item d-flex justify-content-between  align-items-center user-request-li">
      <div>
        <strong className="mx-2"> Name : </strong> {element.userRequestName}{" "}
        <strong className="mx-2"> Email : </strong> {element.userRequestEmail}
      </div>
      <div>
        <i
          class=" mx-1 fa  fa-solid fa-square-check"
          onClick={() => {
            addRequestedUser(element);
          }}
        ></i>
        <i
          class="mx-1 fa-solid fa-rectangle-xmark"
          onClick={() => {
            deleteRequestedUser(element);
            showAlert('user deleted successfully..' , 'warning')
          }}
        ></i>
      </div>
    </li>
  );
};

export default UserCard;
