import Layout from '../components/Layout'
import { connect } from 'react-redux'

import {changeUser} from '../reducers/userSlice'
import {fbAuth} from '../config/firebase'


const Redux = props => {

  console.log(props)
  props.changeUser({userName: 'Sam'})
  console.log(props.user)

  fbAuth.onAuthStateChanged(user => {
    console.log(user.email)
   // props.changeUser({userName: user.email})
    console.log(props.user)
  })

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