import { Box, CircularProgress, Grid } from "@mui/material";
import Input from "../Input";
import Button from "../Button";
import useNewFundForm from "@hooks/useNewFundForm";
import { useNavigate } from "react-router";
import { Routes } from "@constants/routes";

type NewFundFormProps = {
  isChildForm?: boolean;
  fundId: string | null;
};
const NewFundForm = ({ isChildForm, fundId }: NewFundFormProps) => {
  const navigate = useNavigate();
  const {
    newFundControl,
    submitNewFund,
    newFundErrors,
    newFundIsLoading,
    newFundIsUpdateLoading
  } = useNewFundForm(fundId || null);
  const handleSubmit = (e) => {
    e.preventDefault();
    submitNewFund().then((result) => {
      if (result) {
        navigate(Routes.FUND_MANAGER_FUNDS);
      }
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Input
            rounded={false}
            label='Fund Name'
            type="text"
            name="name"
            control={newFundControl}
            error={!!newFundErrors.name?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Input
            rounded={false}
            label='Website URL'
            type="text"
            name="websiteUrl"
            control={newFundControl}
            error={!!newFundErrors.websiteUrl?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Input
            rounded={false}
            label='Legal Entity'
            type="text"
            name="legalEntity"
            control={newFundControl}
            error={!!newFundErrors.legalEntity?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Input
            rounded={false}
            label='Description'
            multiline
            rows={5}
            name="description"
            control={newFundControl}
            error={!!newFundErrors.description?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Input
            rounded={false}
            label='Fund Size'
            type="text"
            name="fundSize"
            control={newFundControl}
            error={!!newFundErrors.fundSize?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Input
            rounded={false}
            label="Estimated Value"
            type="text"
            name="estimatedValue"
            control={newFundControl}
            error={!!newFundErrors.estimatedValue?.message}
          />
        </Grid>
        {!isChildForm && (
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate(Routes.FUND_MANAGER_FUNDS)}
                disabled={newFundIsLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={newFundIsLoading}
                sx={{
                  bgcolor: 'black',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
                }}
              >
                {(newFundIsLoading || newFundIsUpdateLoading) ? <CircularProgress size={24} /> : 'Create Fund'}
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </form>
  )
}

export default NewFundForm;