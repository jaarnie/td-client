import React, { useState, useCallback, useContext } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg'
import { makeStyles } from '@material-ui/core/styles'
import { EditorState, convertToRaw } from 'draft-js'
import { Paper, Grid, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import { Store } from '../../Store'
import { server } from '../../api/api'
import Time from '../Time/Time'
import { upperCaseFirst } from '../../utils/helpers'
import { happyIcon, neutralIcon, sadIcon } from '../../constants/Icons'
import SelectUsers from '../SelectUsers/SelectUsers'
import EntryProgressBar from '../EntryProgressBar/EntryProgressBar'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  editorClass: {
    height: '20vh',
  },
  iconPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
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
    // event.currentTarget.style.backgroundColor = moodColor(
    //   event.currentTarget.value
    // )
    // debugger
  }

  // const moodColor = (mood) => {
  //   switch (mood) {
  //     case 'happy':
  //       return 'green'
  //     case 'neutral':
  //       return 'yellow'
  //     case 'sad':
  //       return 'red'
  //     default:
  //       return null
  //   }
  // }

  const feelingsIcons = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.iconPaper}>{happyIcon(handleClick)}</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.iconPaper}>
            {neutralIcon(handleClick)}
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.iconPaper}>{sadIcon(handleClick)}</Paper>
        </Grid>
      </Grid>
    )
  }

  const entryDetails = () => {
    return <Typography variant='h6'>Mood: {upperCaseFirst(localState.mood)}</Typography>
  }

  return (
    <div>
      {feelingsIcons()}
      <Time selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      {entryDetails()}

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
        <EntryProgressBar
          progress={[linkedUser, localState.mood]}
          handleSave={handleSave}
        />
      </div>
    </div>
  )
}
