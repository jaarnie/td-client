import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})

export default function DailyCard({ daily }) {
  const history = useHistory()
  const classes = useStyles()

  const handleClick = () => {
    // debugger
    // return history.push(`/daily/${entryId}`)
  }

  return (
    <Card className={classes.card} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a espread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Link
          to={{
            pathname: `/daily/${daily.id}`,
            state: { daily }
          }}
        >
          <Button size="small" color="primary">
            Read Entry
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
