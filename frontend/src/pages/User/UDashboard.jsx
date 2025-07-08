import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'

const UDashboard = () => {
  useUserAuth()
  return (
    <div>UDashboard</div>
  )
}

export default UDashboard