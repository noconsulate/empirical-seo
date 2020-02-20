
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