const AdminReducer = (state = "", action) => {
  
  if (action.type === "Add Admin") {
    let data = async () => {
      const response = await fetch(
        "http://localhost:5000/api/administration/admin/signup",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(action.payload),
        }
      );
      const json = await response.json();
      const data = await json;

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        
      } else {
        
      }
      return data.token;
    };

    data();
    return (state = "admin");
  } else if (action.type === "admin Login") {
    let data = async () => {
      const response = await fetch(
        "http://localhost:5000/api/administration/auth/admin/login",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(action.payload),
        }
      );
      const json = await response.json();
      const data = await json;
      if (data.token === undefined) {
        localStorage.removeItem("authToken");
      } else {
        localStorage.setItem("authToken", data.token);
        document.getElementById('default-nav').style.display = 'none'
        document.getElementById('login-nav').style.display = 'block'
      }
      return data;
    };
    data();
    let data1 = data();
    console.log(data1);
    const authToken = localStorage.getItem("authToken");
    return state = "admin";
  } else if (action.type === "Add Manager") {
    let data = async () => {
      const response = await fetch(
        "http://localhost:5000/api/administration/manager/signup",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(action.payload),
        }
      );
      const json = await response.json();
      const data = await json;
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("permission", true);
      } else {
        localStorage.removeItem("authToken");
      }
      return data;
    };
    data();
    return (state = "manager");
  } else if (action.type === "manager Login") {
    let data = async () => {
      const response = await fetch(
        "http://localhost:5000/api/administration/auth/manager/login",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(action.payload),
        }
      );
      const json = await response.json();
      const data = await json;
      if (data.token === undefined) {
        localStorage.removeItem("authToken");
      } else {
        localStorage.setItem("authToken", data.token);
        document.getElementById('default-nav').style.display = 'none'
        document.getElementById('login-nav').style.display = 'block'
      }
      return data;
    };
    data();
    const authToken = localStorage.getItem("authToken");
    return state = "manager";
  } else if (action.type === "user Login") {
    let data = async () => {
      const response = await fetch(
        "http://localhost:5000/api/administration/auth/user/login",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(action.payload),
        }
      );
      const data = await response.json();
      if (data.user) {
        localStorage.setItem("authToken", true);
        document.getElementById('default-nav').style.display = 'none'
        document.getElementById('login-nav').style.display = 'block'
      } else {
        localStorage.removeItem("authToken");
      }
    };
    data();
    const authToken = localStorage.getItem("authToken");
    return state = "user";
  }
  else if(action.type ==='logout'){
    localStorage.removeItem('authToken');
    document.getElementById('default-nav').style.display = 'block'
    document.getElementById('login-nav').style.display = 'none'
    return state='';
  }
   else {
    return state;
  }
};

export default AdminReducer;
