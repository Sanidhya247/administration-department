import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { logout } = bindActionCreators(actionCreators, dispatch);
  const val = useSelector((state) => state.Admin);
  useEffect(()=>{
    document.getElementById('default-nav').style.display='block';
    document.getElementById('login-nav').style.display = 'none'
  },[])
  const logout1 = () => {
    
    logout();
    props.showAlert('Log-Out Successfully...' , 'success')
  };
  return (
    <div>
      <header className="nav">
        <div className="nav-left">
          <h3>
            <Link to="/"> Administration Department </Link>
          </h3>
        </div>

        <div className="nav-right" id="default-nav">
          <Link to="/" className="btn btn-outline-info">
            Login as Admin
          </Link>
          <Link to="/loginmanager" className="btn btn-outline-info">
            Login as Manager
          </Link>
          <Link to="loginuser" className="btn btn-outline-info">
            Login as User
          </Link>
        </div>

        <div className="nav-right" id="login-nav">
          {" "}
          <Link className="btn btn-outline-info mx-2">{val}</Link>
          <Link className="btn btn-outline-info mx-2" onClick={logout1}>
            Log-out
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
