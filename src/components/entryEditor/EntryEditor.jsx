import React, { useState, useCallback, useContext } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'
import { makeStyles } from '@material-ui/core/styles'
import { EditorState, convertToRaw } from 'draft-js'
import { Button, Paper, Grid } from '@material-ui/core'
import Axios from 'axios'
import { useSnackbar } from 'notistack'

import { Store } from '../../Store'
import { serverHeaders, serverRoot } from '../../config/index'
import Time from '../Time/Time'
import { happyIcon, neutralIcon, sadIcon } from '../../constants/Icons'
import SelectUsers from '../SelectUsers/SelectUsers'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  editorClass: {
    height: '40vh',
  },
}))

export default function EntryEditor() {
  const classes = useStyles()
  const { state } = useContext(Store)

  const { enqueueSnackbar } = useSnackbar()

  const axiosServer = Axios.create({
    baseURL: serverRoot,
    headers: serverHeaders,
  })

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedUser, setSelectedUser] = useState('')
  const [localState, setLocalState] = useState({
    editorState: EditorState.createEmpty(),
    mood: null,
    happy_score: null,
    sad_score: null,
    achievement_score: null,
    therapist_id: null,
  })

  const handleEditorChange = (editorState) => {
    setLocalState({
      editorState,
    })
  }

  const handleSelectChange = useCallback((event) => {
    setSelectedUser(event.target.value)
  }, [])

  const handleSave = async (event) => {
    // overwrite if exists
    event.preventDefault()
    const contentRaw = convertToRaw(localState.editorState.getCurrentContent())
    // debugger
    if (!localState.mood) {
      enqueueSnackbar('You must select a mood', {
        variant: 'error',
      })
    } else {
      try {
        const response = await axiosServer.post('/entries', {
          content: JSON.stringify(contentRaw),
          // happy_score: 10, //admin
          // sad_score: 0, // admin
          // achievement_score: 0,
          therapist_id: 1, // pass down from admin
          user_id: 1,
          user_entry_datetime: selectedDate,
          mood: localState.mood,
          content_title: null,
        })
        if (response.status === 201) {
          enqueueSnackbar('Entry saved', {
            variant: 'success',
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleClick = (event) => {
    event.preventDefault()
    setLocalState({ ...localState, mood: event.currentTarget.value })
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
      {console.log(localState)}
      {console.log(localState.mood)}
      {feelingsIcons()}
      <Time selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Paper className={classes.paper}>
        <Editor
          editorState={localState.editorState}
          toolbarClassName='editorToolbar'
          wrapperClassName='editorWrapper'
          editorClassName={classes.editorClass}
          onEditorStateChange={handleEditorChange}
        />
      </Paper>
      <SelectUsers
        handleSelectChange={handleSelectChange}
        users={state.allUsers}
        name={selectedUser.name}
        value={selectedUser}
      />
      <div style={{ textAlign: 'center' }}>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
