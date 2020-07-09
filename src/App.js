import React from "react"
import { Route, Switch } from "react-router-dom"
import { CssBaseline, Container } from "@material-ui/core"

import Home from "./containers/Home"
import NotFound from "./NotFound"
import UserAdmin from './components/UserAdmin/UserAdmin'
import Therapist from "./components/Therapist/Therapist"
import Entry from './components/Entry/Entry'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/therapist" component={Therapist} />
          <Route path="/home" component={UserAdmin} />
          <Route path="/test/:id" component={Entry} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
