import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

const ManagerLogin = () => {
  const ref = useRef();
  let dispatch = useDispatch();
  const { addManager,handleLogin } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const managerSignUp = () => {
    ref.current.click();
  };
  const managerAdd = () => {
    let newManagerName = document.getElementById("new-manager-name").value;
    let newManagerEmail = document.getElementById("new-manager-email").value;
    let newManagerPassword = document.getElementById(
      "new-manager-password"
    ).value;
    let newManager = {
      managerName: newManagerName,
      managerEmail: newManagerEmail,
      password: newManagerPassword,
    };
    addManager(newManager);
    ref.current.click();
  };
  const Loginmanager = () => {
    let managerEmail = document.getElementById("manager-email").value;
    let managerPassword = document.getElementById("manager-password").value;
    let alreadyManager = {
      managerEmail : managerEmail,
      password : managerPassword
    }
    handleLogin(alreadyManager);
    setTimeout(() => {
      let token = localStorage.getItem("authToken");
      if (token) {
        navigate("/users");
      } 
    }, 250);
    
  };

  return (
    <div className="manager-login-page">
      <section className="container manager-login ">
        <h1>Manager-Login</h1>
        <body>
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
                      Sign up as a Manager
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
                        Manager Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="new-manager-name"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Manager E-Mail
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="new-manager-email"
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
                        id="new-manager-password"
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
                      onClick={managerAdd}
                      className="btn btn-info"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="manager-login-form" >
              <div>
                <label htmlFor="manager-name">Manager Email</label>
                <input
                  id="manager-email"
                  className="form-control form-control-md"
                  type="text"
                  placeholder="Enter manager email address"
                />
              </div>
              <div>
                <label htmlFor="manager-name">Password</label>
                <input
                  id="manager-password"
                  className="form-control form-control-md"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div>
                <button type="submit" onClick={Loginmanager} className="btn btn-info">
                  Log-in
                </button>
              </div>
                {/* <div>
                  <p onClick={managerSignUp}>Not a Manager a want to signup ?</p>
                </div> */}
            </div>
          </div>
        </body>
      </section>
    </div>
  );
};

export default ManagerLogin;
