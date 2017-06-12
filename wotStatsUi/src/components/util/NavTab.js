import React from 'react'
import {Route, Link} from 'react-router-dom'

const NavTab = ({to, children}) => (
  <Route path={to} children={({match}) => (
    <li role="presentation" className={match ? 'active' : ''}>
      <Link to={to}>{children}</Link>
    </li>
  )} />
)

export default NavTab
