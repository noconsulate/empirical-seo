import Typography from '@material-ui/core/Typography'
import Head from 'next/head'

import Header from './Header'

const Layout = props => {
  return (

    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header />
      {props.content}
    </div>
  )
}

export default Layout