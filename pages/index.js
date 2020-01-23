import Link from '../src/Link'

import Layout from '../components/Layout'

const pageContent = (
  <div>
    <Link href='/survey'>
      Survey
    </Link>
  </div>
)

const Index = () => {
  return (
    <Layout 
      content={pageContent} 
      title='Empirical SEO'
    />
  )
}

export default Index