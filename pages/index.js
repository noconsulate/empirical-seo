// import Link from '../src/Link'

// import Layout from '../components/Layout'

// const pageContent = (
//   <div>
//     <Link href='/survey'>
//       Survey
//     </Link>
//   </div>
// )

// const Index = () => {
//   return (
//     <Layout 
//       content={pageContent} 
//       title='Empirical SEO'
//     />
//   )
// }

// export default Index

import React, {useEffect} from 'react';
import Router from 'next/router'

export default function App() {

  useEffect(() => { 
    const {pathname} = Router
    if(pathname == '/' ){
      Router.push('/create')
    }  
  }
  , []);
  return (
    null
  )
}