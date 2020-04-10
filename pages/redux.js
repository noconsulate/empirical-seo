import Layout from '../components/Layout'
import { connect } from 'react-redux'

import {changeUser} from '../reducers/userSlice'
import {fbAuth} from '../config/firebase'


const Redux = props => {


  const pageContent = () => {
    return (
      <>
        <p>hello {props.user.userEmail}</p>
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

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {
  changeUser
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Redux)