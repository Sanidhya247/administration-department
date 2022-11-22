import React from 'react'
import Users from './Users'

const MainHome = (props) => {
  const {showAlert} = props;
  return (
    <div>
      <Users showAlert={showAlert}/>
    </div>
  )
}

export default MainHome
