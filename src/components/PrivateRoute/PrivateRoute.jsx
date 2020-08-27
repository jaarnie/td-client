import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { getAccessToken } from '../../utils/session'

const PrivateRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = getAccessToken()

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
