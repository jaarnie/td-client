import React, { useContext } from 'react'
import MapCards from '../MapCards/MapCards'
import { useHistory } from 'react-router-dom'
import { get } from 'lodash'

import { Store } from '../../Store'
import { sortIntoWeek, sortByRecent } from '../../utils/helpers'

export default function Entries() {
  const { state } = useContext(Store)
  const entries = get(state, 'entries')
  const sortedEntries = sortByRecent(entries)
  // debugger
  const history = useHistory()

  return (
    <div>
      {state.user ? <MapCards entries={sortedEntries.slice(0, 7)} /> : history.push('/home')}
    </div>

  )
}
