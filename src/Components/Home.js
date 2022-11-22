import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

const Home = (props) => {
  const ref = useRef();

  const dispatch = useDispatch();
  const { addAdmin, adminLogin } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();
  const val = useSelector(state =>state.Admin)


  const adminAdd = () => {
    localStorage.removeItem("authToken");
    let newAdminName = document.getElementById("new-admin-name").value;
    let newAdminEmail = document.getElementById("new-admin-email").value;
    let newAdminPassword = document.getElementById("new-admin-password").value;
    let newAdmin = {
      adminName: newAdminName,
      adminEmail: newAdminEmail,
      password: newAdminPassword,
    };
    addAdmin(newAdmin);
    setTimeout(() => {
      let token = localStorage.getItem("authToken");
      if (token) {
        ref.current.click();
        
      } else {
        ref.current.click();
      }
    }, 250);
  };

  const LoginAdmin = () => {
    let AdminEmail = document.getElementById("admin-email").value;
    let AdminPassword = document.getElementById("admin-password").value;
    let Admin = {
      adminEmail: AdminEmail,
      password: AdminPassword,
    };
    adminLogin(Admin);
    setTimeout(() => {
      let token = localStorage.getItem("authToken");
      if (token) {
        navigate("/users");
        props.showAlert('Logged in successfully...' , 'success')
      }else{
        props.showAlert('there might be some error ! try again later...' , 'danger')
      }
    }, 250);
  };
  const SignUp = () => {  
    ref.current.click();
  };

  return (
    <div className="admin-login-page">
      <section className="container admin-login ">
        <h1>Admin-Login</h1>

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
                    Sign up as a admin
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
                      Admin Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="new-admin-name"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Admin E-Mail
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="new-admin-email"  
                    />  
                  </div>
                  <div className="mb-2">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="new-admin-password"
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
                    onClick={adminAdd}
                    className="btn btn-info"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-login-form">
            <div>
              <label htmlFor="admin-name">Admin Email Addess</label>
              <input
                id="admin-email"
                className="form-control form-control-md"
                type="text"
                placeholder="Enter Admin email address"
              />
            </div>
            <div>
              <label htmlFor="admin-name">Password</label>
              <input
                id="admin-password"
                className="form-control form-control-md"
                type="password"
                placeholder="Enter Password"
              />
            </div>
            <div>
              <button
                type="submit"
                onClick={LoginAdmin}
                className="btn btn-info"
              >
                Log-in
              </button>
            </div>
            {/* <div>
              <p onClick={SignUp}>Not a admin a want to signup ?</p>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
