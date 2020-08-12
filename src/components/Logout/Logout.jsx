import React, { useContext } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  // TextField,
  // FormControlLabel,
  // Checkbox,
  // Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Store } from '../../Store'
import { destroySession } from '../../utils/session'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      <Link color='inherit' to='https://github.com/jaarnie/'>
        github |
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Login({ handleClose }) {
  const { state } = useContext(Store)
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()


  const handleClick = (event) => {
    // event.preventDefault()
    destroySession()
    enqueueSnackbar('Logged out', {
      variant: 'success',
    })
  }


  console.log(state)
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Logout
        </Typography>
        <form className={classes.form} noValidate>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleClick}
          >
            Logout
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
