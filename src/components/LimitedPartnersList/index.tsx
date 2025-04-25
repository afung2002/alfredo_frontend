import { CircularProgress } from "@mui/material";
import LimitedPartnerCard from "../LimitedPartnerCard";

type LimitedPartnersListProps = {
  limitedPartners: any[];
  isLoading?: boolean;
}
const LimitedPartnersList = ({limitedPartners, isLoading}: LimitedPartnersListProps) => {
    
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full gap-4">
      {
        limitedPartners && limitedPartners?.length > 0 && limitedPartners.map((partner, index) => (
          <LimitedPartnerCard key={index} limitedPartner={partner} />
        ))
      }
    </div>
  )
}

export default LimitedPartnersList;