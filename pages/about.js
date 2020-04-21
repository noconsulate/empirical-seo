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
const About = () => {
  const classes = useStyles()

  const pageContent = (
    <div className={classes.root}>
      <Typography variant='body1'>
        Epirical SEO keyword picker. Version 0.1.
        <br />
        <br />
        Copyright 2020 Janssen Kuhn
        <br />
        <br />
        By Janssen Kuhn for Epirical
        <br />
        <br />
        <Link href='mailto:janssenkuhn@mailbox.org'>
          Contact
        </Link>
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

export default About