import Typography from '@material-ui/core/Typography'

import Header from './Header'

const Layout = props => {
  return (
    <div>
      <Header />
      <Typography variant='h3'>
        Empircal SEO
      </Typography>
      {props.content}
    </div>
  )
}

export default Layout