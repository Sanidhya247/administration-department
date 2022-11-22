import React, {  useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

const UserLogin = (props) => {
  const ref = useRef();
  const dispatch = useDispatch();

  const { handleUserLogin } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();

  const userLogin = (props) => {
    let userEmail = document.getElementById("userEmail").value;
    let password = document.getElementById("userPassword").value;
    let alreadyUser = {
      userEmail: userEmail,
      password: password,
    };
    handleUserLogin(alreadyUser);
    setTimeout(()=>{
      let authToken = localStorage.getItem('authToken');
      if(authToken){
        navigate('/users')
        props.showAlert('your request has been sent to admin successfully...' , 'success')
      }else{
        return props.showAlert('you are no longer user !' , 'danger')
      }
    },250)
    
  };
  const userSignUp = () => {
    ref.current.click();
  };
  const signUpUser = async () => {
    let newUserName = document.getElementById("new-user-name").value;
    let newUserEmail = document.getElementById("new-user-email").value;
    let newUserPassword = document.getElementById("new-user-password").value;
    let newUser = {
      userRequestName: newUserName,
      userRequestEmail: newUserEmail,
      userRequestpassword: newUserPassword,
    };
    const response  = await fetch("http://localhost:5000/api/administration/userrequest", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json" },

    });
    ref.current.click();
    const json = await response.json();
    console.log(json.errors)
    if(json.errors){
      props.showAlert('please try to fill your details properly !' , 'danger')
    }else{
      props.showAlert('your request has been sent to admin successfully...' , 'success')
    }
  };
  
  return (
    <div>
      <div className="user-login-page">
        <section className="container user-login ">
          <h1>User-Login</h1>

          <div>
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
                      Sign up as a User
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
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="new-user-name"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        User E-Mail
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="new-user-email"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="new-user-password"
                      />
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
                      onClick={signUpUser}
                      className="btn btn-info"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-login-form">
              <div>
                <label htmlFor="user-name">User email address</label>
                <input
                  id="userEmail"
                  className="form-control form-control-md"
                  type="text"
                  placeholder="Enter User address"
                />
              </div>
              <div>
                <label htmlFor="user-password">Password</label>
                <input
                  id="userPassword"
                  className="form-control form-control-md"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={userLogin}
                  className="btn btn-info"
                >
                  Log-in
                </button>
              </div>
              <div>
                <p onClick={userSignUp}>Not a User a want to signup ?</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserLogin;
