import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Popover, IconButton } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

import Login from '../Login/Login'
import Logout from '../Logout/Logout'

export default function NavigationPopover() {
  const state = useSelector((state) => state.user)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    // return state.user && history.push("/profile")
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div>
      <IconButton style={{ color: 'white' }} onClick={handleClick}>
        <AccountCircle />
      </IconButton>

      <Popover
        id={'sign-in-popover'}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {state.user ? (
          <Logout handleClose={handleClose} />
        ) : (
          <Login handleClose={handleClose} />
        )}
      </Popover>
    </div>
  )
}
