import React, { useState, useCallback, useContext } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'
import { makeStyles } from '@material-ui/core/styles'
import { EditorState, convertToRaw } from 'draft-js'
import { Button, Paper, Grid, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import { Store } from '../../Store'
import { server } from '../../api/api'
import Time from '../Time/Time'
import { happyIcon, neutralIcon, sadIcon } from '../../constants/Icons'
import SelectUsers from '../SelectUsers/SelectUsers'
import Stepper from '../Stepper/Stepper'

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
    height: '20vh',
  },
}))

export default function EntryEditor() {
  const classes = useStyles()
  const { state } = useContext(Store)

  const { enqueueSnackbar } = useSnackbar()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedUser, setSelectedUser] = useState('')
  const [linkedUser, setLinkedUser] = useState(null)
  const [localState, setLocalState] = useState({
    editorState: EditorState.createEmpty(),
    mood: null,
    therapist_id: null,
  })

  const handleEditorChange = (editorState) => {
    setLocalState({
      ...localState,
      editorState,
    })
  }

  const handleSelectChange = useCallback((event) => {
    setSelectedUser(event.target.value)
    setLinkedUser(event.target.value)
    // setLocalState({ ...localState, therapist_id: event.target.value })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async (event) => {
    // overwrite if exists
    event.preventDefault()
    const contentRaw = convertToRaw(localState.editorState.getCurrentContent())
    if (!localState.mood) {
      enqueueSnackbar('You must select a mood', {
        variant: 'error',
      })
    } else {
      try {
        const response = await server.post('/entries', {
          content: JSON.stringify(contentRaw),
          therapist_id: linkedUser,
          user_id: 1,
          user_entry_datetime: selectedDate,
          mood: localState.mood,
          content_title: 'testing',
        })
        if (response.status === 201) {
          enqueueSnackbar('Entry saved', {
            variant: 'success',
          })
        }
      } catch (err) {
        enqueueSnackbar(`Error: ${err}`, {
          variant: 'error',
        })
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

  return (
    <div>
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
      {state.user ? (
        <SelectUsers
          handleSelectChange={handleSelectChange}
          users={state.linkedUsers}
          name={selectedUser.name}
          value={selectedUser}
          user={state.user}
        />
      ) : (
        <Typography variant='h5'>
          Please add your recipient in your profile
        </Typography>
      )}

      {/* therapists need to map users to state or it blows */}
      <div style={{ textAlign: 'center' }}>
        <Stepper />
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
