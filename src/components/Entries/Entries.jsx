import React, { useContext, useEffect } from 'react'
import MapCards from '../MapCards/MapCards'
import { useHistory } from 'react-router-dom'
import { get } from 'lodash'

import { Store } from '../../Store'
import { sortIntoWeek, sortByRecent } from '../../utils/helpers'
import { server } from '../../api/api'
import { getAccessToken } from '../../utils/session'

export default function Entries() {
  const { state, dispatch } = useContext(Store)
  const entries = get(state, 'entries')
  const sortedEntries = sortByRecent(entries)
  const history = useHistory()

  useEffect(() => {
    async function fetchEntries() {
      const response = await server.get('/profile', {
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },

      })
      dispatch({
        type: 'SET_ENTRIES',
        payload: response.data.entries
      })
    }
    fetchEntries();
  }, [dispatch])

  return (
    <div>
      {state.user ? <MapCards entries={sortedEntries.slice(0, 7)} /> : history.push('/home')}
    </div>

  )
}
