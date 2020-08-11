import React, { useEffect, useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CssBaseline, Container } from '@material-ui/core'

import Home from './containers/Home'
import NotFound from './NotFound'
import UserAdmin from './components/UserAdmin/UserAdmin'
import Therapist from './components/Therapist/Therapist'
import Entry from './components/Entry/Entry'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'

import { Store } from './Store'
import { server } from './api/api'

function App() {
  const { dispatch } = useContext(Store)

  useEffect(() => {
    async function fetchSession() {
      if (localStorage.auth_token) {
        try {
          const response = await server.get(`/profile`)
          if (response.status === 200) {
            dispatch({
              type: 'SET_USER',
              payload: response.data,
            })
          }
        } catch {}
      }
    }
    fetchSession()
  }, [])

  return (
    <div className='App'>
      <CssBaseline />
      <Container maxWidth='md'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/therapist' component={Therapist} />
          <Route path='/home' component={UserAdmin} />
          <Route path='/entry/:id' component={Entry} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
