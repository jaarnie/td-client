import React from 'react'
import {
  SentimentSatisfiedOutlined,
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
} from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

export const happyIcon = (handleClick, bool) => (
  <IconButton
    aria-label='happy'
    onClick={handleClick}
    value='happy'
    style={{ color: '#43a047' }}
    disabled={bool}
  >
    <SentimentSatisfiedOutlined fontSize='large' />
  </IconButton>
)

export const neutralIcon = (handleClick, bool) => {
  return (
    <IconButton
      aria-label='neutral'
      onClick={handleClick}
      value='neutral'
      style={{ color: '#fc9303' }}
      disabled={bool}
    >
      <SentimentDissatisfied fontSize='large' />
    </IconButton>
  )
}

export const sadIcon = (handleClick, bool) => {
  return (
    <IconButton
      aria-label='sad'
      onClick={handleClick}
      value='sad'
      style={{ color: '#c4342d' }}
      disabled={bool}
    >
      <SentimentVeryDissatisfied fontSize='large' />
    </IconButton>
  )
}

export const showIcon = (userDaily) => {
  const mood = userDaily.mood

  if (mood === 'happy') {
    return happyIcon(null, false)
  } else if (mood === 'neutral') {
    return neutralIcon(null, false)
  } else if (mood === 'sad') {
    return sadIcon(null, false)
  } else {
    return null
  }
}
