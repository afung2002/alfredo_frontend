import { Box, CircularProgress, Grid } from "@mui/material";
import Input from "../Input";
import useCompanyForm from "./hooks/useCompanyForm";
import Button from "../Button";
import { useEffect } from "react";
import { useGetCompaniesQuery } from '@services/api/baseApi';

type NewCompanyFormProps = {
  onClose?: () => void;
  selectCreatedCompany?: (company: any) => void;
};

const NewCompanyForm = ({onClose, selectCreatedCompany}: NewCompanyFormProps) => {
  const { refetch: refetchCompanies } = useGetCompaniesQuery();
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    error,
    createdCompanyId,
    handleWebsiteBlur,
  } = useCompanyForm();
  useEffect(() => {
    if (createdCompanyId) {
      refetchCompanies().then(() => {
        selectCreatedCompany?.(createdCompanyId);
      });
    }
  }, [createdCompanyId]);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Input rounded={false} label="Company Name" name="companyName" control={control} error={!!errors.companyName?.message} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Input onBlur={handleWebsiteBlur} rounded={false} label="Website URL" name="websiteUrl" control={control} error={!!errors.websiteUrl?.message} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Input rounded={false} label="Founder Email" name="founderEmail" control={control} error={!!errors.founderEmail?.message} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Input rounded={false} label="Description" name="description" multiline rows={4} control={control} error={!!errors.description?.message} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </Grid>
      </Grid>

    </form>
  )
}

export default NewCompanyForm;