import React from 'react'

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
   <span><input value = {filter || ''} placeholder="Search " onChange = {(e) => setFilter(e.target.value)} /></span>
  )
}

export default GlobalFilter;
