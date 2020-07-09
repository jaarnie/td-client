import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export default function SelectUsers({ handleSelectChange, users, value }) {
  const classes = useStyles()

  const items = (users) => {
    return users.map((user) => (
      <MenuItem key={user.id} value={user.id}>
        {user.firstName + ' ' + user.lastName}
      </MenuItem>
    ))
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='config-select-label'>Select User</InputLabel>
        <Select
          id='user-select'
          value={value}
          onChange={handleSelectChange}
          className={classes.selectEmpty}
        >
          {items(users)}
        </Select>
      </FormControl>
    </div>
  )
}
