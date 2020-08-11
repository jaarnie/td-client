import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Popover from '../Popover/Popover'
import { Store } from '../../Store'
// import { authApi } from '../../api/api'
// import { parseAccessToken, getAccessToken } from '../../utils/session'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '5vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function ButtonAppBar() {
  const { state } = useContext(Store)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            {/* TD */}
            {state.user && state.user.first_name}
          </Typography>
          <Popover />
        </Toolbar>
      </AppBar>
    </div>
  )
}
