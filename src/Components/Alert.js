import React from "react";

const Alert = (props) => {
  return (
    <div style={{height:'50px'}}>
    {props.alert && (
      <div id="alert">
        <div
          class= {`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.alert.message}</strong>
          
        </div>
      </div>
    )}
    </div>
  );
};

export default Alert;
