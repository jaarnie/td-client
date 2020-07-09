// import React, { useContext } from "react"
// import { makeStyles } from "@material-ui/core/styles"
// import { Grid } from "@material-ui/core"

// import { Store } from "../../Store"
// import EntryEditor from "../entryEditor/EntryEditor"

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1
//   }
// }))

// export default function UserAdmin() {
//   const classes = useStyles()
//   const { state } = useContext(Store)

//   const profileInfo = () => {}

//   const titleBar = () => {}

//   const dropdown = () => {}

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
          // <EntryEditor />
//         </Grid>
//       </Grid>
//     </div>
//   )
// }

import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core'

import { Store } from '../../Store'
import EntryEditor from '../EntryEditor/EntryEditor'
import MapCards from '../MapCards/MapCards'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function LinkTab(props) {
  return (
    <Tab
      component='a'
      onClick={(event) => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function Home() {
  const { state } = useContext(Store)
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  console.log(state)
  return (
    state.user && (
      <div className={classes.root}>
        <AppBar position='static'>
          <Tabs variant='fullWidth' value={value} onChange={handleChange}>
            <LinkTab label='Profile' />
            <LinkTab label='Previous Entries' />
            <LinkTab label='Write Entry' />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {/* <MapCards deliveries={sentDeliveries} /> */}
          {/* <MapCards entries={state.entries}/> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <MapCards deliveries={incomingDeliveries} /> */}
        </TabPanel>
        <TabPanel value={value} index={2}>
        <EntryEditor />
        </TabPanel>
      </div>
    )
  )
}

