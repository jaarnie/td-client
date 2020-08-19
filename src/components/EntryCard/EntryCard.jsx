import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { getFormattedDateTime } from "../../utils/helpers"
import { showIcon } from "../../constants/Icons"


const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})

export default function DailyCard({ entry }) {
  const classes = useStyles()

  // debugger
  const handleClick = () => {
    // return history.push(`/entry/${entryId}`)
  }

  return (
    <Card className={classes.card} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://www.picsum.photos/300/200"
          title="Entry Pic"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {getFormattedDateTime(entry.user_entry_datetime)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {entry.user_content_title}
          </Typography>
          {showIcon(entry)}

        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          to={{
            pathname: `/entry/${entry.id}`,
            state: { entry }
          }}
        >
          <Button size="small" color="primary" component="span">
            Read Entry
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
