import { Outlet } from "react-router-dom"
import DashboardNavigation from "@components/DashboardNavigation"
import { useUser } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import { selectUserTicket } from "../../redux/selectors/user.selector";
import { useEffect } from "react";
import { useAcceptLimitedPartnerInvitationMutation } from "../../services/api/baseApi";
const MasterLayout = () => {
  const { user } = useUser();
  console.log('user', user);
  const ticket = useSelector(selectUserTicket);
  const [createLimitedPartner, { isLoading: creatingLP }] =
    useAcceptLimitedPartnerInvitationMutation();
  useEffect(() => {
    if (ticket && user) {
      const fund_id = user.publicMetadata.fund_id as number | undefined;
      const invested_amount = user.publicMetadata.invested_amount as number | undefined;
      console.log('ticket', ticket);
      createLimitedPartner({  
        fund: fund_id,
        limited_partner: user.id,
        invested_amount: invested_amount }
      );
    }
  }, [ticket, user]);
  return (
    <div className="w-full min-h-screen flex ">
      <DashboardNavigation />
      <div className="p-4 w-full ">
      <Outlet />
      </div>
    </div>
  )
}

export default MasterLayout