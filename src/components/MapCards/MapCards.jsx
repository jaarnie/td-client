import React from 'react'
import { Grid } from '@material-ui/core'
import EntryCard from '../EntryCard/EntryCard'

export default function MapCards({ entries }) {
  return (
    <Grid container spacing={2}>
      {entries.map((entry, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <EntryCard entry={entry} />
        </Grid>
      ))}
    </Grid>
  )
}
