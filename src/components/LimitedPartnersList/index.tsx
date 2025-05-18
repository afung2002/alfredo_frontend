import { CircularProgress, Typography } from "@mui/material";
import LimitedPartnerCard from "../LimitedPartnerCard";
import InvitationCard from "../InvitationCard";

type LimitedPartnersListProps = {
  limitedPartners: any[];
  isLoading?: boolean;
  page?: 'LimitedPartners' | 'Fund' | 'Invitations';
}
const LimitedPartnersList = ({limitedPartners, isLoading, page}: LimitedPartnersListProps) => {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full gap-4 mt-2">
      {
        page === 'Fund' || page === 'LimitedPartners' && limitedPartners && limitedPartners?.length > 0 && limitedPartners.map((partner, index) => (
          <LimitedPartnerCard key={index} limitedPartner={partner} />
        ))
      }
      {
        page === 'Invitations' && limitedPartners?.length > 0 && 
        limitedPartners.map((partner, index) => (
          <InvitationCard key={index} limitedPartner={partner} />
        ))
      }
      {
        !limitedPartners || limitedPartners?.length === 0 && (
          <div className="w-full flex justify-center items-center h-full">
            <Typography>No limited partners found</Typography>
          </div>
        )
      }
    </div>
  )
}

export default LimitedPartnersList;