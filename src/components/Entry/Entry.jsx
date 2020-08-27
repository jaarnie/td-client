import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import {
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core'

import {
  Person as PersonIcon,
  Schedule as ScheduleIcon,
} from '@material-ui/icons/'

import { getFormattedDateTime } from '../../utils/helpers'
import { showIcon } from '../../constants/Icons'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: '20px',
  },
  icon: {
    background: 'transparent',
  },
}))

export default function Entry(entry) {
  const classes = useStyles()
  const userEntry = entry.location.state.entry
  const contentState = convertFromRaw(JSON.parse(userEntry.content))
  const editorState = EditorState.createWithContent(contentState)
  const datetime = userEntry.user_entry_datetime

  return (
    <div>

      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='Client' secondary={userEntry.username} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ScheduleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary='Date'
            secondary={getFormattedDateTime(datetime)}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.icon}>{showIcon(userEntry)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary='Mood' secondary={userEntry.mood} />
        </ListItem>
      </List>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant='h5'>{userEntry.entry_title}</Typography>
            <Editor editorState={editorState} readOnly />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
