import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import { useHistory } from "react-router-dom"

import { Store } from "../../Store"
import EntryCard from "../EntryCard/EntryCard"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: "20px"
  }
}))

export default function Therapist() {
  const history = useHistory()
  const { state } = useContext(Store)

  const showEntryCards = () => {
    // debugger
    return state.therapist ? (
      <Grid container spacing={2}>
        {state.therapist.entries.map((entry, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <EntryCard entry={entry} />
          </Grid>
        ))}
      </Grid>
    ) : (
      history.push("/")
    )
  }

  return <div>{showEntryCards()}</div>
}
