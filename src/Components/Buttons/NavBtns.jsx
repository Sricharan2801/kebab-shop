import React, { Children } from 'react'

const NavBtns = ({className,onClick,children}) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default NavBtns
