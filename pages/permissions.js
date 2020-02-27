import { db, fbAuth } from '../config/firebase'
import React, {useEffect, useState} from 'react'

const permissions = props => {
  const SCENARIOUID = 'cCImPNu7asQzg81HRFpr'
  const URLID = '8Zb9dGe7'

  let keywords, anId

  useEffect(() => {
    db.collection('scenarios').where('urlId', '==', URLID).get()
      .then(snap => {
        snap.forEach(doc => {
          console.log(doc.id)
          anId = doc.id
        })
      })
      .catch(error => {
        console.log(error)
      })
      console.log(anId)
  }, [])
  return (
    <div>
      <p>yay fun</p>
    </div>
  )
}

export default permissions


