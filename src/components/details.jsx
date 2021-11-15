import React, {Component} from 'react'
import ReignOfSerenityDetails from './reign-of-serenity-details'
import LG7Details from './lg7-details'
import Navbar from './details-components/navbar'
import WanderlustInvocationDetails from './wanderlust-invocation-details'

export default function Details(props) {
  const { selectedDetail, backToHome } = props
  const pages = {
    'reign-of-serenity': <ReignOfSerenityDetails />,
    'lg7': <LG7Details/>,
    'wanderlust-invocation': <WanderlustInvocationDetails/>,
  }
  return (
    <>
    <Navbar
    backToHome={backToHome}
    />
    {pages[selectedDetail]}
    </>
  )
}
