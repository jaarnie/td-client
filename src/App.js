import React from "react"
import { Route, Switch } from "react-router-dom"
import { CssBaseline, Container } from "@material-ui/core"

import Home from "./containers/Home"
import NotFound from "./NotFound"
import UserAdmin from './components/user/UserAdmin'
import Therapist from "./components/therapist/Therapist"
import Entry from './components/entries/Entry'
import HiKat from './components/user/HiKat'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/therapist" component={Therapist} />
          <Route path="/entry" component={UserAdmin} />
          <Route path="/test/:id" component={Entry} />
          <Route path="/kat" component={HiKat} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
