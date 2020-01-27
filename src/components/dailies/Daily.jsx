import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Editor, EditorState, convertFromRaw } from "draft-js"
import { Paper, Grid, Card } from "@material-ui/core"

import { Store } from "../../Store"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: "20px"
  }
}))

export default function Daily(daily) {
  const classes = useStyles()
  const { state } = useContext(Store)

  const showDailies = () => {
    if (state.therapist) {
      const contentState = convertFromRaw(
        JSON.parse(daily.location.state.daily.entry)
      )
      const editorState = EditorState.createWithContent(contentState)
      return (
        <Paper className={classes.paper}>
          <Editor editorState={editorState} readOnly={true} />
        </Paper>
      )
    } else {
      return "no content"
    }
  }

  return <div>{showDailies()}</div>
}
