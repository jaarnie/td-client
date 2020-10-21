import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import Entries from './components/Entries/Entries'

// import { server } from './api/api'
// import { setUserDetailsToState } from './utils/index'
import { getUserData } from './redux/actions/userActions'
import Profile from './components/Profile/Profile'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

function App() {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const fetchSession = () => {
    if (localStorage.auth_token) {
      dispatch(getUserData())
    }
  }

  useEffect(() => {
    fetchSession()
  }, [])

  console.log(state)
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/therapist" component={Therapist} />
          <Route path="/home" component={Home} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/login" component={Login} />

          <PrivateRoute path="/entry/:id" component={Entry} />
          <PrivateRoute path="/entries" component={Entries} />
          <PrivateRoute path="/editor" component={EntryEditor} />
          <PrivateRoute path="/profile" component={Profile} />

          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
