import { Box, CircularProgress, Grid } from "@mui/material";
import Card from "../Card";
import Button from "../Button";
import { useNavigate } from "react-router";
import Input from "../Input";
import useLimitedPartnerFundForm from "./hooks/useLimitedPartnerFundForm";
import Select from "../Select";
import { useGetLimitedPartnersQuery } from "../../services/api/baseApi";
import { useEffect } from "react";

type NewLimitedPartnerFundFormProps = {
  fundId?: number | string;
  closeModal: () => void;
};
const NewLimitedPartnerFundForm = ({fundId, closeModal}: NewLimitedPartnerFundFormProps) => {
  const navigate = useNavigate();
    const { data: limitedPartners, isLoading: isLoadingLimitedPartners } = useGetLimitedPartnersQuery();

    const {
      control,
      handleSubmit,
      onSubmit,
      errors,
      isLoading,
      addedLimitedPartner,
    } = useLimitedPartnerFundForm(fundId);
    useEffect(() => {
      if (isLoading) return;
      if (addedLimitedPartner) {

        closeModal();
      }
    }, [addedLimitedPartner]);
  return (
    <Card sx={{ border: '1px solid', borderColor: 'grey.200', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', p: '30px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Select
              rounded={false}
              label="Limited Partner"
              name="limitedPartner"
              control={control}
              options={
                isLoadingLimitedPartners
                  ? [{ value: '', label: 'Loading limited partners...' }]
                  : limitedPartners && limitedPartners.length > 0
                    ? [
                      ...limitedPartners.map((lp) => ({
                        value: String(lp.user_id ?? 'Unknown'),
                        label: lp.legal_entity ?? 'Unknown',
                      })),
                    ]
                    : [{ value: 'no_limited_partner', label: 'No limited part found' }]
              }
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Input rounded={false} label="Invested Amount" name="investedAmount" control={control} error={!!errors.investedAmount?.message} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={closeModal} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Card>
  )
}

export default NewLimitedPartnerFundForm;