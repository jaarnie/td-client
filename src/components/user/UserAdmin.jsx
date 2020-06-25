import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

import { Store } from "../../Store"
import EntryEditor from "../entryEditor/EntryEditor"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}))

export default function UserAdmin() {
  const classes = useStyles()
  const { state } = useContext(Store)

  const profileInfo = () => {}

  const titleBar = () => {}

  const dropdown = () => {}

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EntryEditor />
        </Grid>
      </Grid>
    </div>
  )
}
