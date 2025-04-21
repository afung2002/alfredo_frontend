import { Box, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import Card from "../Card";
import Button from "../Button";
import { useNavigate } from "react-router";
import Input from "../Input";
import useLimitedPartnerFundForm from "./hooks/useLimitedPartnerFundForm";
import Select from "../Select";
import { useGetLimitedPartnersQuery } from "../../services/api/baseApi";
import { useEffect } from "react";
import useLimitedPartnerForm from "@src/apps/fund-manager/pages/NewLimitedPartner/hooks/useLimitedPartnerForm";

type NewLimitedPartnerFundFormProps = {
  fundId?: number | string;
  closeModal: () => void;
};
const NewLimitedPartnerFundForm = ({fundId, closeModal}: NewLimitedPartnerFundFormProps) => {
  const navigate = useNavigate();
    const { data: limitedPartnersData, isLoading: limitedPartnersLoading, error: limitedPartnersError } = useGetLimitedPartnersQuery();
    const {
      control,
      handleSubmit,
      onSubmit,
      errors,
      isLoading,
    } = useLimitedPartnerForm();
    // const {
    //   control,
    //   handleSubmit,
    //   onSubmit,
    //   errors,
    //   isLoading,
    //   addedLimitedPartner,
    // } = useLimitedPartnerFundForm(fundId);
    // useEffect(() => {
    //   if (isLoading) return;
    //   if (addedLimitedPartner) {

    //     closeModal();
    //   }
    // }, [addedLimitedPartner]);
  return (
     <Card sx={{ border: '1px solid', borderColor: 'grey.200', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', p: '30px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom>Select from existing</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Select
                rounded={false}
                label="Limited Partners"
                name="limitedPartners"
                control={control}
                options={
                  limitedPartnersLoading
                    ? [{ value: '', label: 'Loading limited partners...' }]
                    : limitedPartnersData && limitedPartnersData.length > 0
                      ? [
                        ...limitedPartnersData.map((lp) => ({
                          value: String(lp.user_id ?? 'Unknown'),
                          label: lp.legal_entity ?? 'Unknown',
                        })),
                      ]
                      : [{ value: 'no_limited_partner', label: 'No limited partner found' }]
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider sx={{my: 3}}>Or</Divider>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom>Invite new limited partner</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Input rounded={false} label="User ID" name="user_id" control={control} error={!!errors.user_id?.message} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Input rounded={false} label="Website URL" name="website_url" control={control} error={!!errors.website_url?.message} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Input rounded={false} label="Legal Entity" name="legal_entity" control={control} error={!!errors.legal_entity?.message} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Input rounded={false} label="Description" name="description" multiline rows={4} control={control} error={!!errors.description?.message} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate(-1)} disabled={isLoading}>
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