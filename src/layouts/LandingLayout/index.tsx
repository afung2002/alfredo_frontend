import { Outlet } from "react-router-dom"
import LandingSideBanner from "../../components/LandingSideBanner"

const LandingLayout = () => {
  return (
    <div className="w-full min-h-screen flex">
      <LandingSideBanner />
      <Outlet />
    </div>
  )
}

export default LandingLayout