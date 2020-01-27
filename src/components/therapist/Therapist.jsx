import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Grid, Card } from "@material-ui/core"

import { Store } from "../../Store"
import DailyCard from "../dailies/DailyCard"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: "20px"
    // display: "flex",
    // flexDirection: "column"
    // alignItems: "center"
  }
}))

export default function Therapist() {
  const classes = useStyles()
  const { state } = useContext(Store)

  const showDailyCards = () => {
    // debugger
    return state.therapist ? (
      <Grid container spacing={2}>
        {state.therapist.dailies.map((dailyEntry, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <DailyCard daily={dailyEntry} />
          </Grid>
        ))}
      </Grid>
    ) : (
      "no content"
    )
  }

  return <div>{showDailyCards()}</div>
}
