import React, { useContext } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Store } from '../../Store'
import DailyEditor from '../dailyeditor/DailyEditor'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function UserAdmin() {
  const classes = useStyles();
  const { state } = useContext(Store)


  const profileInfo = () => {

  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <DailyEditor />
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}

