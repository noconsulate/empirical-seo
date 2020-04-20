import { Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Layout from '../components/layout/Layout'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    border: 'dashed',
    borderColor: 'green'
  },
}))
const Help = () => {
  const classes = useStyles()

  const pageContent = (
    <div className={classes.root}>
      <Typography variant='body1'>
        You can create a new scenario by clicking on create. First, submit your scenario. You will see a mockup of the scenario before you click on continue unless you choose to go back and edit it. After you have clicked continue you will be given two links, the first is to the link you will give to users to answer your survey and the second is the results page. It would be wise to bookmark these two links to help you keep track of your survey. You can also bookmark this page if you want to come back later and manage your new survey. -not yet implemented

        <br /> <br />

        If you enter your email address you can make the results to your scenario private, meaning only you or anyone who has access to your email can see them. Simply follow the link sent to you and you will be logged into your account or one will be made for you if it’s your first time. This page is a list of all of your surveys where you can see their results or deleted unwanted items. At any time you can logout and your data will be hidden until the next time you login via email.

        <br /> <br />

        While using the app you can click on your email address or ‘login’ in the nav bar to see all of your surveys.

        Please {' '}

        <Link href='mailto:janssenkuhn@mailbox.org'>
         email us
        </Link>
        {' '} with any questions or feedback.
      </Typography>
    </div>
  )

  return (
    <>
      <Layout
        content={pageContent}
        title={'Help Page'}
      />
    </>
  )
}

export default Help