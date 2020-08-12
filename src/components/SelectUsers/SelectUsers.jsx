import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export default function SelectUsers({
  handleSelectChange,
  users,
  value,
  user,
}) {
  const classes = useStyles()

  const items = (users) => {
    console.log('select users >>>', users)
    return users.map((user) => (
      <MenuItem key={user.id} value={user.id}>
        {user.first_name + ' ' + user.last_name}
      </MenuItem>
    ))
  }

  const title = user.type === 'Therapist' ? 'Client' : 'Therapist'

  console.log('value >>>', value)
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='config-select-label'>Select {title}</InputLabel>
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
