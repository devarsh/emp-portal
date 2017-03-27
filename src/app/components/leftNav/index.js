import React from 'react';

import { List, ListItem } from 'react-toolbox'

import RRLink from '../util/RRLinkFunc.js'

const LeftNav = () => (
  <List selectable ripple>
    <RRLink key={1} to="/myProfile">
       {
        (location,handler,isActive) => {
          const className = 'customRouterList'
          const activeClassName = 'customRouterListActive'
          const _className = isActive ? `${className} ${activeClassName}` : className;
          return <ListItem caption="My Profile" onClick={handler} className={_className} />
        }
      }
    </RRLink>
    <RRLink key={2} to="/companyPolicy">
      {
        (location,handler,isActive) => {
          const className = 'customRouterList'
          const activeClassName = 'customRouterListActive'
          const _className = isActive ? `${className} ${activeClassName}` : className;
          return <ListItem to={location} caption="Company Policy" onClick={handler} className={_className} />
        }
      }
    </RRLink>
    <RRLink key={3} to="/leaveRequest">
      {
        (location,handler,isActive) => {
          const className = 'customRouterList'
          const activeClassName = 'customRouterListActive'
          const _className = isActive ? `${className} ${activeClassName}` : className;
          return <ListItem to={location} caption="Leave Request" onClick={handler} className={_className} />
        }
      }
    </RRLink>
    <RRLink key={4} to="/downloads">
      {
        (location,handler,isActive) => {
          const className = 'customRouterList'
          const activeClassName = 'customRouterListActive'
          const _className = isActive ? `${className} ${activeClassName}` : className;
          return <ListItem to={location} caption="Downloads" onClick={handler} className={_className} />
        }
      }
    </RRLink>
  </List>
)

export default LeftNav
