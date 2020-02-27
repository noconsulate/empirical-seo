

const handleSignIn = event => {
  event.preventDefault()
  console.log('opt in?', checked)

  const actionCodeSettings = {
    url: `${prodUrl}/portal?mode='create'&optin=${checked}&urlid=${urlId}&scenarioid=${scenarioUid}`,
    handleCodeInApp: true,
  }

  fbAuth.sendSignInLinkToEmail(formText, actionCodeSettings)
    .then(() => {
      console.log('link sent')
      window.localStorage.setItem('emailForSignIn', formText)
    })
    .catch(error => {
      console.log(error)
    })
    // set scenario to private
    db.collection('scenarios').doc(scenarioUid).update({
      private: true,
    })
}
