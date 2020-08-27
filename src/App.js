import React, { useEffect, useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CssBaseline, Container } from '@material-ui/core'

import Landing from './containers/Landing'
import NotFound from './NotFound'
import Home from './components/Home/Home'
import Therapist from './components/Therapist/Therapist'
import Entry from './components/Entry/Entry'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import EntryEditor from './components/EntryEditor/EntryEditor'
import Entries from "./components/Entries/Entries"

import { Store } from './Store'
import { server } from './api/api'
import { setUserDetailsToState } from './utils/index'
import Profile from './components/Profile/Profile'

function App() {
  const { state, dispatch } = useContext(Store)

  useEffect(() => {
    async function fetchSession() {
      if (localStorage.auth_token) {
        try {
          const response = await server.get(`/profile`)
          if (response.status === 200) {
            setUserDetailsToState(response, dispatch)
          }
        } catch {}
      }
    }
    fetchSession()
  }, [dispatch])

  console.log(state)
  return (
    <div className='App'>
      <CssBaseline />
      <Container maxWidth='md'>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/therapist' component={Therapist} />
          <Route path='/home' component={Home} />
          <Route path='/entry/:id' component={Entry} />
          <Route path='/entries' component={Entries} />
          <Route path='/editor' component={EntryEditor} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />

          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
