import React from 'react'
import { navItems } from '../utils'

const NavItems = ({setShowNavItems,className}) => {
  return (
    <>
        {navItems.map((item, index) => (
            <a
                key={index}
                href={item.path}
                className={className}
                onClick={() => setShowNavItems(false)}
            >
                {item.name}
            </a>
        ))}
    </>
  )
}

export default NavItems
