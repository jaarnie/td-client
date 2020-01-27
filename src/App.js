import React from "react"
import { Route, Switch } from "react-router-dom"
import { CssBaseline, Container } from "@material-ui/core"

import Home from "./containers/Home"
import NotFound from "./NotFound"
import UserAdmin from './components/user/UserAdmin'
import Therapist from "./components/therapist/Therapist"
import Daily from './components/dailies/Daily'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/therapist" component={Therapist} />
          <Route path="/admin" component={UserAdmin} />
          <Route path="/daily/:id" component={Daily} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
