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
    <>
      {
        limitedPartners && limitedPartners?.length > 0 && limitedPartners.map((partner, index) => (
          <LimitedPartnerCard key={index} limitedPartner={partner} />
        ))
      }
    </>
  )
}

export default LimitedPartnersList;