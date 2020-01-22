import Typography from '@material-ui/core/Typography'

import NavBar from './NavBar'

const Layout = props => {
  return (
    <div>
      <NavBar />
      <Typography variant='h3'>
        Empircal SEO
      </Typography>
      {props.content}
    </div>
  )
}

export default Layout