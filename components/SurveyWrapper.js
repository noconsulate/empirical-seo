import { makeStyles } from '@material-ui/core/styles'

import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  header: {
    backgroundColor: 'cyan',
  },
  footer: {
    backgroundColor: 'yellow',
  },
})

const SurveyWrapper = props => {
  const Header = () => {
    return (
      <>
      </>
    )
  }

  return (
    <>
      {props.content}
    </>
  )
}

export default SurveyWrapper