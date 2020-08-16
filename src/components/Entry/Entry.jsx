import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { Paper, Grid, Typography } from '@material-ui/core'

// import { Store } from '../../Store'
import { getTime, getDate } from '../../utils/helpers'
import { showIcon } from '../../constants/Icons'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: '20px',
  },
}))

export default function Entry(entry) {
  const classes = useStyles()
  // const { state } = useContext(Store)
  const userEntry = entry.location.state.entry
  const contentState = convertFromRaw(JSON.parse(userEntry.content))
  const editorState = EditorState.createWithContent(contentState)
  const datetime = userEntry.user_entry_datetime

  // debugger

  // const showEntries = () => {
  //   // if (state.therapist) {

  //     return (

  //     )
  //   // } else {
  //   //   return "no content"
  //   // }
  // }

  // const showEntryDetails = () => {
  //   return (
  //     // state.therapist && (

  //     // )
  //   )
  // }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant='h5'>{getTime(datetime)}</Typography>
            <Typography variant='h6'>{getDate(datetime)}</Typography>
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography variant='h6'>
              Patient:{' '}
              {userEntry.user.first_name + ' ' + userEntry.user.last_name}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper className={classes.paper}>
            <div style={{ textAlign: 'center' }}>{showIcon(userEntry)}</div>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant='h5'>{userEntry.entry_title}</Typography>
            <Editor editorState={editorState} readOnly={true} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
