import React from 'react'
import Proptypes from 'prop-types'
import zxcvbn from 'zxcvbn'
import { makeStyles } from '@material-ui/core/styles'
import { LinearProgress, Paper } from '@material-ui/core'
// import { yellow, amber, green } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    padding: theme.spacing(3, 3),
  },
  progressBar: {
    padding: 10,
  },
  textBox: {
    align: 'justify',
  },
  strengthLabel: {
    marginTop: 10,
    textAlign: 'center',
  },
}))

const PasswordStrength = ({ password }) => {
  const classes = useStyles()
  const testedResult = zxcvbn(password).score

  const strengthLabel = () => {
    switch (testedResult) {
      case 0:
        return 'Weak'
      case 1:
        return 'Weak'
      case 2:
        return 'Fair'
      case 3:
        return 'Good'
      case 4:
        return 'Strong'
      default:
        return 'Weak'
    }
  }

  return (
    <div>
      <Paper className={classes.root}>
        <LinearProgress
          className={classes.progressBar}
          // color={'8BC34A'}
          variant='determinate'
          value={testedResult * 25}
        />
        <div className={classes.strengthLabel}>
          Password strength: {strengthLabel()}
        </div>
      </Paper>
    </div>
  )
}

PasswordStrength.defaultProps = {
  password: '',
}

PasswordStrength.propTypes = {
  password: Proptypes.string,
}

export default React.memo(PasswordStrength)
