import { Outlet } from "react-router-dom"
import DashboardNavigation from "@components/DashboardNavigation"

const MasterLayout = () => {
  return (
    <div className="w-full min-h-screen flex">
      <DashboardNavigation />
      <div className="p-4 w-full">
      <Outlet />
      </div>
    </div>
  )
}

export default MasterLayout