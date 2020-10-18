import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'

import { setAccessToken, getAccessToken } from '../../utils/session'
import { setUserDetailsToState } from '../../redux/actions/userActions'
import { authApi, server } from '../../api/api'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" to="https://github.com/jaarnie/">
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
  const state = useSelector((state) => state.state)
  const dispatch = useDispatch()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()

  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleClick = async (event) => {
    event.preventDefault()
    try {
      const response = await authApi.post('/login', {
        email: values.username,
        password: values.password,
      })
      if (response.status === 200) {
        setAccessToken(response)
        if (localStorage.auth_token) {
          dispatch(setUserDetailsToState())

          enqueueSnackbar(`Welcome, ${state.user.userObj.first_name}`, {
            variant: 'success',
          })

          handleClose()
          // history.push('/home')
        }
      }
    } catch (error) {
      enqueueSnackbar(`${error.message || error.response.data.message}`, {
        variant: 'error',
      })
    }
  }

  const filledForm = () => {
    return values.username && values.password !== '' ? false : true
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={filledForm()}
            onClick={handleClick}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item xs>
              <Link to="/sign-up">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link onClick={handleClose} to="/sign-up">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
