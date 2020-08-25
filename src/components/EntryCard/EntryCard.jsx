import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core/'

import { getFormattedDateTime } from '../../utils/helpers'
import { showIcon } from '../../constants/Icons'

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

export default function DailyCard({ entry }) {
  const classes = useStyles()

  const handleClick = () => {
    // return history.push(`/entry/${entryId}`)
  }

  return (
    <Card className={classes.card} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          // image="https://www.picsum.photos/300/200"
          image='https://picsum.photos/id/926/300/200.jpg'
          title='Entry Pic'
        />
        <CardContent>
          <Typography
            gutterBottom
            color='textSecondary'
            variant='p'
            component='p'
          >
            {getFormattedDateTime(entry.user_entry_datetime)}
          </Typography>
          <Typography variant='h5' component='h5'>
            {/* {entry.user.first_name} */}
            {entry.content_title}
          </Typography>
          {showIcon(entry)}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          to={{
            pathname: `/entry/${entry.id}`,
            state: { entry },
          }}
        >
          <Button size='small' color='primary' component='span'>
            Read Entry
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
