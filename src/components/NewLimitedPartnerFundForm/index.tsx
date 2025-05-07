import { Box, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import Card from "../Card";
import Button from "../Button";
import { useNavigate } from "react-router";
import Input from "../Input";
import Select from "../Select";
import { useGetLimitedPartnersQuery } from "../../services/api/baseApi";
import useLimitedPartnerFundForm from "./hooks/useLimitedPartnerFundForm";

type NewLimitedPartnerFundFormProps = {
  fundId?: number | string;
  closeModal: () => void;
};

const NewLimitedPartnerFundForm = ({ fundId, closeModal }: NewLimitedPartnerFundFormProps) => {
  const navigate = useNavigate();
  const { data: limitedPartnersData, isLoading: limitedPartnersLoading } = useGetLimitedPartnersQuery();
  
  // Pass closeModal to the hook
  const {
    existingLpForm,
    inviteLpForm,
    onSubmitExisting,
    onSubmitInvitation,
    isAddingExisting,
    isInvitingNew,
  } = useLimitedPartnerFundForm(fundId, closeModal);

  return (
    <Card sx={{ border: '1px solid', borderColor: 'grey.200', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', p: '30px' }}>
      
      {/* --- Form for selecting existing LP --- */}
      <form onSubmit={existingLpForm.handleSubmit(onSubmitExisting)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>Select from existing</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Select
              rounded={false}
              label="Limited Partners"
              name="limitedPartner"
              control={existingLpForm.control}
              options={
                limitedPartnersLoading
                  ? [{ value: '', label: 'Loading limited partners...' }]
                  : limitedPartnersData && limitedPartnersData.length > 0
                    ? limitedPartnersData.map((lp) => ({
                        value: String(lp.user_id ?? 'Unknown'),
                        label: lp.name ?? 'Unknown',
                      }))
                    : [{ value: 'no_limited_partner', label: 'No limited partner found' }]
              }
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Input rounded={false} label="Amount Invested" name="investedAmount" control={existingLpForm.control} />
          </Grid>
          <Grid size={{ xs: 12 }} className="flex justify-end">
            <Button type="submit" variant="contained" disabled={isAddingExisting}>
              {isAddingExisting ? <CircularProgress size={24} /> : 'Add'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* --- Divider between the two flows --- */}
      <Divider sx={{ my: 4 }}>Or</Divider>

      {/* --- Form for inviting new LP --- */}
      <form onSubmit={inviteLpForm.handleSubmit(onSubmitInvitation)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom>Invite new limited partner</Typography>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Input type="text" rounded={false} label="Name" name="name" control={inviteLpForm.control} />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Input type="email" rounded={false} label="Email" name="email" control={inviteLpForm.control} />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Input type="text" rounded={false} label="Website" name="website" control={inviteLpForm.control} />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Input type="text" rounded={false} label="Amount Invested" name="fundAmount" control={inviteLpForm.control} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Input multiline rows={4} rounded={false} label="Description" name="description" control={inviteLpForm.control} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={() => navigate(-1)} disabled={isInvitingNew}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={isInvitingNew}>
                {isInvitingNew ? <CircularProgress size={24} /> : 'Invite'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

    </Card>
  );
};

export default NewLimitedPartnerFundForm