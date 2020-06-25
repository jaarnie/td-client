import React, { useState } from "react"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { Editor } from "react-draft-wysiwyg"
import { makeStyles } from "@material-ui/core/styles"
import { EditorState, convertToRaw } from "draft-js"
import { Button, Paper, Grid } from "@material-ui/core"
import Axios from "axios"
import { useSnackbar } from "notistack"

import { serverHeaders, serverRoot } from "../../config/index"
import Time from "./Time"
import { happyIcon, neutralIcon, sadIcon } from "../../constants/Icons"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  button: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function EntryEditor() {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const axiosServer = Axios.create({
    baseURL: serverRoot,
    headers: serverHeaders
  })

  const [selectedDate, setSelectedDate] = useState(new Date())

  const [state, setState] = useState({
    editorState: EditorState.createEmpty(),
    mood: null,
    happy_score: null,
    sad_score: null,
    achievement_score: null,
    therapist_id: null,
  })

  const handleEditorChange = editorState => {
    setState({
      editorState
    })
  }

  const handleSave = async event => {
    // overwrite if exists
    event.preventDefault()
    const contentRaw = convertToRaw(state.editorState.getCurrentContent())
    // debugger
    if (!state.mood) {
      enqueueSnackbar("You must select a mood", {
        variant: "error"
      })
    } else {
      try {
        const response = await axiosServer.post("/entries", {
          content: JSON.stringify(contentRaw),
          // happy_score: 10, //admin
          // sad_score: 0, // admin
          // achievement_score: 0,
          therapist_id: 1, // pass down from admin
          user_id: 1,
          user_entry_datetime: selectedDate,
          mood: state.mood,
          content_title: null
        })
        if (response.status === 201) {
          enqueueSnackbar("Entry saved", {
            variant: "success"
          })
          
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleClick = event => {
    event.preventDefault()
    setState({ ...state, mood: event.currentTarget.value })
  }

  const feelingsIcons = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>{happyIcon(handleClick)}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>{neutralIcon(handleClick)}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>{sadIcon(handleClick)}</Paper>
        </Grid>
      </Grid>
    )
  }

  // const entryTitle = () => {}

  return (
    <div>
      {console.log(state)}
      {console.log(state.mood)}
      {feelingsIcons()}
      <Time selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Paper className={classes.paper}>
        <Editor
          editorState={state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleEditorChange}
        />
      </Paper>
      <div style={{ textAlign: "center" }}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
