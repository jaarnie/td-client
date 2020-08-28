import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
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

  return (
    <Link
      to={{
        pathname: `/entry/${entry.id}`,
        state: { entry },
      }}
    >
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            // image="https://www.picsum.photos/300/200"
            image='https://picsum.photos/id/926/300/200.jpg'
            title='Entry Pic'
          />
          <CardContent>
            <Typography gutterBottom color='textSecondary' variant='body1'>
              {getFormattedDateTime(entry.user_entry_datetime)}
            </Typography>
            <Typography variant='h5' component='h5'>
              {/* {entry.user.first_name} */}
              {entry.content_title}
            </Typography>
            {showIcon(entry)}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}
