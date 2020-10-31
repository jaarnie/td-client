import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Drawer,
  List,
  ListItemIcon,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Edit,
  LibraryBooks,
  Person,
  People,
} from '@material-ui/icons'

import clsx from 'clsx'

import Popover from '../Popover/Popover'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: '15vh'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flex: 1,
  },
}))

export default function Navigation() {
  const user = useSelector(state => state.user.credentials)
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const menuIcons = (name) => {
    switch (name) {
      case 'Write Entry': {
        return <Edit />
      }
      case 'Entries': {
        return <LibraryBooks />
      }
      case 'Profile': {
        return <Person />
      }
      default:
        return null
    }
  }

  // make parent/child component?
  const menuItems = () => {
    const map = {
      '/editor': 'Write Entry',
      '/entries': 'Entries',
      '/profile': 'Profile',
    }
    return Object.entries(map).map((obj) => (
      <Link to={obj[0]} key={obj[0]}>
        <ListItem button>
          <ListItemIcon>{menuIcons(obj[1])}</ListItemIcon>
          <ListItemText primary={obj[1]} />
        </ListItem>
      </Link>
    ))
  }

  const linkedUsersText =
    user && user.type === 'Therapist'
      ? 'Your client(s)'
      : 'Your therapist(s)'

  return (
    <div className={classes.root}>
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.title}>
            <Typography variant='h6' noWrap>
              Tentry
            </Typography>
          </div>
          <Typography variant='h6' noWrap>
            {user && 'Welcome ' + user.first_name}
          </Typography>
          <Popover />
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>{menuItems()}</List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary={linkedUsersText} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}
