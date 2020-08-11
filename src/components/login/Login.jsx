import React, { useState, useContext } from 'react'
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
// import { useHistory } from 'react-router-dom'

import { setAccessToken } from '../../utils/session'
import { Store } from '../../Store'
import { authApi, server } from '../../api/api'
// import { MAIN_COLOUR } from "../../constants"

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
    // backgroundColor: MAIN_COLOUR
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // backgroundColor: MAIN_COLOUR
  },
}))

export default function Login({ handleClose }) {
  // const history = useHistory()
  const { state, dispatch } = useContext(Store)
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()

  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  // const getAllUsers = async (endpoint) => {

  //   const usersResponse = await authApi.get(`/${endpoint}`)
  //   const arr = []
  //   usersResponse.data.forEach((x) =>
  //     arr.push({
  //       id: x.id,
  //       firstName: x.first_name,
  //       lastName: x.last_name,
  //     })
  //   )
  //   dispatch({
  //     type: 'SET_ALL_USERS',
  //     payload: arr,
  //   })
  // }

  // const getUser = async () => {
  //   try {
  //     const response = await authApi.get('/')

  //   } catch {

  //   }

  //   // if (!response.data.is_therapist) {
  //   //   getAllUsers('therapists')
  //     // dispatch({
  //     //   type: 'SET_USER',
  //     //   payload: response.data,
  //     // })
  //   //   dispatch({
  //   //     type: 'SET_ENTRIES',
  //   //     payload: response.data.entries,
  //   //   })
  //   //   return history.push('/home')
  //   // } else {
  //   //   dispatch({
  //   //     type: 'SET_THERAPIST',
  //   //     payload: response.data,
  //   //   })
  //   //   return history.push('/therapist')
  //   // }
  // }

  const getUser = async () => {
    try {
      const response = await server.get('/profile')
      if (response.status === 200) {
        dispatch({
          type: 'SET_USER',
          payload: response.data,
        })
        enqueueSnackbar(`Welcome, ${response.data.first_name}`, {
          variant: 'success',
        })
      }
    } catch {
      enqueueSnackbar(`Error`, {
        variant: 'error',
      })
    }
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
        getUser()

      }
    } catch (err) {
      enqueueSnackbar(`Error`, {
        variant: 'error',
      })
    }
  }

  const filledForm = () => {
    return values.username && values.password !== '' ? false : true
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
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={filledForm()}
            onClick={handleClick}
          >
            Sign In
          </Button>
          <Grid container justify='center'>
            <Grid item xs>
              <Link to='/sign-up'>Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link onClick={handleClose} to='/sign-up'>
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
