import React, {Component} from 'react'
import LG1Details from './lg1-details'
import LG7Details from './lg7-details'
import Navbar from './details-components/navbar'
import OutCampusDetails from './out-campus-details'

export default function Details(props) {
  const { selectedDetail, backToHome } = props
  const pages = {
    'lg1': <LG1Details />,
    'lg7': <LG7Details/>,
    'out-campus': <OutCampusDetails/>,
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
