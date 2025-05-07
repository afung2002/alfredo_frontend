import { Box, CircularProgress, Divider, Grid, Typography, Card } from "@mui/material";
import Button from "@components/Button";
import { useNavigate } from "react-router";
import Input from "@components/Input";
import Select from "@components/Select";
import { useGetLimitedPartnersQuery, useGetFundsQuery } from "@services/api/baseApi";
import useLimitedPartnerFundForm from "./hooks/useLimitedPartnerFundForm";
import { ArrowBack } from "@mui/icons-material";

type NewLimitedPartnerFundFormProps = {
  closeModal?: () => void;
  fundId?: number | string;
};

const NewLimitedPartnerFundForm = ({ closeModal }: NewLimitedPartnerFundFormProps) => {
  const navigate = useNavigate();
  const { data: funds, isLoading: isFundsLoading } = useGetFundsQuery();

  const {
    inviteLpForm,
    onSubmitInvitation,
    isInvitingNew,
  } = useLimitedPartnerFundForm(closeModal);

  const fundOptions = isFundsLoading
    ? [{ value: '', label: 'Loading funds...' }]
    : funds?.map((fund) => ({
        value: fund.id.toString(),
        label: fund.name ?? 'Unknown',
      })) ?? [];

  return (
    <Card sx={{ border: '1px solid', borderColor: 'grey.200', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', p: '30px' }}>

      <form onSubmit={inviteLpForm.handleSubmit(onSubmitInvitation)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12}}>
          <Button
          variant="text"
          onClick={() => navigate(-1)}
          sx={{
            textAlign: "left",
            color: "gray",
            display: "flex",
            justifyContent: "flex-start",
            "&:hover": {
              color: "black",
            },
          }}
        >
          <ArrowBack />
          Back
        </Button>
          </Grid>
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
            <Select
              rounded={false}
              label="Fund"
              name="fund"
              control={inviteLpForm.control}
              options={fundOptions}
            />
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

export default NewLimitedPartnerFundForm;