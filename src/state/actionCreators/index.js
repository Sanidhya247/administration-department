export const addAdmin = (data)=>{
    return(dispatch)=>{
        dispatch({
            type:'Add Admin',
            payload:data
        })
    }
}

export const adminLogin = (data)=>{
    return(dispatch)=>{
        dispatch({
            type:'admin Login',
            payload:data
        })
    }
}

export const addManager = (data)=>{
    return(dispatch)=>{
        dispatch({
            type:'Add Manager',
            payload:data
        })
    }
}

export const handleLogin = (data) =>{
    return(dispatch)=>{
        dispatch({
            type:'manager Login',
            payload : data
        })
    }
}

export const handleUserLogin = (data) =>{
    return(dispatch)=>{
        dispatch({
            type : 'user Login',
            payload : data
        })
    }
}

export const logout  = () =>{
    return (dispatch)=>{
        dispatch({
            type : 'logout'
        })
    }
} 