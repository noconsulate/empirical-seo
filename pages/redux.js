import Layout from '../components/Layout'

const Redux = props => {

  const pageContent = () => {
    return (
      <>
        <p>hello</p>
      </>
    )
  }

  return (
    <>
      <Layout
        content={pageContent()}
        title='experimenting with redux'
      />
    </>
  )
}

export default Redux