import Head from 'next/head'

import NavBar from './NavBar'
import Header from './Header'

const Layout = props => {
  return (

    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
      <NavBar />
      <Header />
      {props.content}
    </div>
  )
}

export default Layout