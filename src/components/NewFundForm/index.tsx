import { Box, CircularProgress, Grid } from "@mui/material";
import Input from "../Input";
import Button from "../Button";
import useNewFundForm from "@hooks/useNewFundForm";
import { useNavigate } from "react-router";
import { Routes } from "@constants/routes";
import { useEffect } from "react";

type NewFundFormProps = {
  fundId?: string;
  onClose?: () => void;
  selectCreatedFund?: (fund: any) => void;
  onSave?: () => void;
  action?: 'create' | 'edit';
};
const NewFundForm = ({ fundId, onClose, selectCreatedFund, onSave, action }: NewFundFormProps) => {
  const navigate = useNavigate();
  console.log('fundId', fundId)
  const {
    newFundControl,
    submitNewFund,
    newFundErrors,
    newFundIsLoading,
    newFundIsUpdateLoading,
    newFundCreated,
    handleWebsiteBlur,
  } = useNewFundForm(fundId || null);
  const handleSubmit = (e) => {
    e.preventDefault();
    submitNewFund().then((result) => {
      if (result) {
        console.log('result', result)
        // If you want to navigate to the funds page after creating a new fund, uncomment the line below
        
        onSave()
      }
    })
  }
  useEffect(() => {
    if (newFundCreated) {
      onClose?.();
      selectCreatedFund?.(newFundCreated);
    }
  }, [newFundCreated]);
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
            onBlur={handleWebsiteBlur}
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
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={onClose}
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
                {(newFundIsLoading || newFundIsUpdateLoading) ? <CircularProgress size={24} /> : action === 'create' ? 'Create Fund' : 'Update'}
              </Button>
            </Box>
          </Grid>
      </Grid>
    </form>
  )
}

export default NewFundForm;