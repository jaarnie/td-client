import React, { useContext } from 'react'
import MapCards from '../MapCards/MapCards'
import { useHistory } from 'react-router-dom'


import { Store } from '../../Store'
// import { getDate, getTime, sortIntoWeek } from '../../utils/helpers'

export default function Entries() {
  const { state } = useContext(Store)
  const entries = state.user && state.entries
  const history = useHistory()

 const showCards = () => {
  return state.user ? 
  <MapCards entries={entries}/> :
 history.push('/home')
 }

  return (
    <div>
    {
     showCards()
    }
    {/* {sortIntoWeek(entries)} */}
    </div>
  )
}
