import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { LinearProgress, Paper, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    padding: theme.spacing(3, 3),
  },
  progressBar: {
    padding: 10,
  },
  textBox: {
    align: 'justify',
  },
  strengthLabel: {
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function EntryProgressBar({progress, handleSave}) {
  const classes = useStyles()
  let value = null

  const progressValue = (progress) => {

    progress.forEach(x => {
      if (x != null) {
        x = 50
        value += x
      }
    })
    return value
  }

  return (
    <div>
      <Paper className={classes.root}>
        <LinearProgress
          className={classes.progressBar}
          variant='determinate'
          value={progressValue(progress)}
        />
      </Paper>
      {value === 100 &&
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={handleSave}
        >
          Save
        </Button>
      }

    </div>
  )
}
