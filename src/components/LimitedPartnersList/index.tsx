import LimitedPartnerCard from "../LimitedPartnerCard";

type LimitedPartnersListProps = {
  limitedPartners: any[];
}
const LimitedPartnersList = ({limitedPartners}: LimitedPartnersListProps) => {
  return (
    <>
      {
        limitedPartners && limitedPartners?.length > 0 && limitedPartners.map((partner, index) => (
          <LimitedPartnerCard limitedPartner={partner} />
        ))
      }
    </>
  )
}

export default LimitedPartnersList;