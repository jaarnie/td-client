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
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

import { serverRoot, serverHeaders } from '../../config/index'
import { Store } from '../../Store'
import PasswordStrength from '../PasswordStrength/PasswordStrength'
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
  checkbox: {
    marginTop: 10,
  },
}))

export default function Login({ handleClose }) {
  const history = useHistory()
  const { state, dispatch } = useContext(Store)
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()

  const axiosServer = Axios.create({
    baseURL: serverRoot,
    headers: serverHeaders,
  })

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [checked, setChecked] = useState(false)

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked)
  }

  const handleClick = async (event) => {
    event.preventDefault()
    if (checked) {
      console.log('therapist')
      try {
        const response = await axiosServer.post('/therapists', {
          first_name: values.firstName,
          last_name: values.lastName,
          username: values.username,
          password_digest: values.password,
          is_therapist: checked,
        })
        if (response.status === 201) {
          enqueueSnackbar(`Welcome, ${response.data.first_name}`, {
            variant: 'success',
          })
          dispatch({
            type: 'SET_THERAPIST',
            payload: response.data,
          })
          return history.push('/therapist')
        }
      } catch (err) {
        enqueueSnackbar(`Error`, {
          variant: 'error',
        })
      }
    }
  }

  const matchError = () => {
    return values.password === values.confirmPassword ? false : true
  }

  console.log(state, values, checked)
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <form className={classes.form} noValidate autoComplete='off'>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='firstName'
            label='First Name'
            name='firstName'
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='lastName'
            label='Last Name'
            name='lastName'
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
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
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            id='confirm-password'
            onChange={handleChange}
            error={matchError()}
            helperText={matchError() === true ? "Entry doesn't match" : null}
          />
          <PasswordStrength password={values.password} />
          <div className={classes.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  name='therapistCheck'
                  color='primary'
                />
              }
              label="Check here if you're a therapist"
            />
          </div>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleClick}
            disabled={matchError()}
          >
            Sign Up
          </Button>
          <Grid container justify='center'>
            <Grid item xs>
              <Link to='/sign-up'>Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link onClick={handleClose} to='/login'>
                Already have an account? Login
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
