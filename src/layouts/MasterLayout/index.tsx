import { Outlet } from "react-router-dom"
import DashboardNavigation from "@components/DashboardNavigation"
import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { selectUserInvitationId, selectUserTicket } from "../../redux/selectors/user.selector";
import { useEffect } from "react";
import { useAcceptLimitedPartnerInvitationMutation } from "../../services/api/baseApi";
const MasterLayout = () => {
  // const { user } = useUser();
  const user = null;
  const ticket = useSelector(selectUserTicket);
  const invitationId = useSelector(selectUserInvitationId)
  const [createLimitedPartner, { isLoading: creatingLP }] =
    useAcceptLimitedPartnerInvitationMutation();
  useEffect(() => {
    // commented out for demo
    // if (ticket && user && invitationId) {
    //   const name = user.publicMetadata.name as string | undefined;
    //   const email = user.emailAddresses[0].emailAddress as string | undefined;
    //   createLimitedPartner({
    //     invitation_id: invitationId,
    //     name,
    //     email,
    //   }
    //   );
    // }
  }, [ticket, user]);
  return (
    <div className="w-full min-h-screen flex ">
      <DashboardNavigation />
      <div className="p-4 w-full bg-white">
        <Outlet />
      </div>
    </div>
  )
}

export default MasterLayout