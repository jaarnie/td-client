import React from "react"
import {
  SentimentSatisfiedOutlined,
  SentimentVeryDissatisfied,
  SentimentDissatisfied
} from "@material-ui/icons"
import { IconButton } from "@material-ui/core"

export const happyIcon = (handleClick, disable) => {
  return (
    <IconButton
      aria-label="happy"
      onClick={handleClick}
      value="happy"
      style={{ color: "#43a047" }}
      disabled={disable}
    >
      <SentimentSatisfiedOutlined fontSize="large" />
    </IconButton>
  )
}

export const neutralIcon = (handleClick, disable) => {
  return (
    <IconButton
      aria-label="neutral"
      onClick={handleClick}
      value="neutral"
      style={{ color: "#fc9303" }}
      disabled={disable}
    >
      <SentimentDissatisfied fontSize="large" />
    </IconButton>
  )
}

export const sadIcon = (handleClick, disable) => {
  return (
    <IconButton
      aria-label="sad"
      onClick={handleClick}
      value="sad"
      style={{ color: "#c4342d" }}
      disabled={disable}
    >
      <SentimentVeryDissatisfied fontSize="large" />
    </IconButton>
  )
}


export const showIcon = (userDaily) => {
    const mood = userDaily.mood
    const disable = true

    if (mood === "happy") {
      return happyIcon(null, disable)
    } else if (mood === "neutral") {
      return neutralIcon(null, disable)
    } else if (mood === "sad") {
      return sadIcon(null, disable)
    } else {
      return null
    }
  }
