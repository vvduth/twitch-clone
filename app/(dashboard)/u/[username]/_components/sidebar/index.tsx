import React from 'react'
import Wrapper from './wrapper'
import Toogle from './toogle'
import Navigation from './navigation'

const Sidebar = () => {
  return (
    <Wrapper>
      <Toogle />
      <Navigation />
    </Wrapper>
  )
}

export default Sidebar
