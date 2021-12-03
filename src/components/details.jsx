import React, {Component} from 'react'
import K1Details from './k1-details'
import K2Details from './k2-details'
import Navbar from './details-components/navbar'
import K3Details from './k3-details'

export default function Details(props) {
  const { selectedDetail, backToHome } = props
  const pages = {
    'k1': <K1Details/>,
    'k2': <K2Details/>,
    'k3': <K3Details/>,
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
