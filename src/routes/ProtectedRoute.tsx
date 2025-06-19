
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
import type { RootState } from '../Redux/store'

function ProtectedRoute() {
const {loading,email}=useSelector((state:RootState)=>state.auth)

  return (
    <div>
      {loading?null:email?<Outlet></Outlet>:<Navigate to={"login"}></Navigate>}
    </div>
  )
}

export default ProtectedRoute
