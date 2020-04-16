import Typography from '@material-ui/core/Typography'

import Layout from '../components/layout/Layout'

const pageContent = (
  
  <Typography variant="body1">
    Empirical SEO will change your life forever. Bringing SEO to the next level, Empirical SEO will inspire you to create positive change, empowering young minds to stand up a make a change for what's right. Empircal SEO: SEO, empirically.
  </Typography>
)

const About = () => {
  return (
    <Layout content={pageContent} />
  )
}

export default About