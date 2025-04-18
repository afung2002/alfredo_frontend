import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  CircularProgress,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import Input from '@components/Input';
import Button from '@components/Button';
import useUploadDocumentForm from './hooks/useUploadDocumentForm';
import Select from '../Select';
import { useGetCompaniesQuery, useGetFundsQuery, useGetInvestmentsQuery } from '@services/api/baseApi';

interface UploadDocumentModalProps {
  open: boolean;
  onClose: () => void;
  investment?: any;
  fund?: any;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  open,
  onClose,
  investment,
  fund
}) => {
  const { data: funds, isLoading: isFundsLoading, error: fundsError } = useGetFundsQuery();
  const { data: investments, isLoading: isInvestmentsLoading, error: investmentsError } = useGetInvestmentsQuery();
  const { data: companies, isLoading: isCompaniesLoading, error: companiesError } = useGetCompaniesQuery();
  
  const {
    uploadControl,
    submitForm,
    uploadErrors,
    uploadIsLoading,
    setValue,
    watch,
  } = useUploadDocumentForm(() => {
    onClose();
  }, investment, fund);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload New Document</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Input
                rounded={false}
                label="Doc Title *"
                name="docTitle"
                control={uploadControl}
                error={!!uploadErrors.docTitle?.message}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <label>Document Type</label>
              <RadioGroup
                name="documentType"
                row
                defaultValue="investment"
                onChange={(e) => {
                  setValue('documentType', e.target.value as 'investment' | 'fund');
                }}
              >
                <FormControlLabel value="investment" control={<Radio size="small" />} label="Investment" />
                <FormControlLabel value="fund" control={<Radio size="small" />} label="Fund" />
              </RadioGroup>
            </Grid>


            {/* <Grid size={{ xs: 12 }}>
              <Select
                disabled={watch('documentType') === 'fund'}
                rounded={false}
                label="Investment"
                name="investment"
                control={uploadControl}
                options={
                  isInvestmentsLoading
                    ? [{ value: '', label: 'Loading investments...' }]
                    : investments && investments.length > 0
                      ? [
                        ...investments.map((investment) => ({
                          value: String(investment.id ?? 'Unknown'),
                          label: investment.name ?? 'Unknown',
                        })),
                      ]
                      : [{ value: 'no_investments', label: 'No investments found' }]
                }
              />
            </Grid> */}
            {
              (!fund && !investment) &&  (
                <Grid size={{ xs: 12 }}>
                  <Select
                    // disabled={watch('documentType') === 'investment'}
                    rounded={false}
                    label="Fund"
                    name="fund"
                    control={uploadControl}
                    options={
                      isFundsLoading
                        ? [{ value: '', label: 'Loading funds...' }]
                        : funds && funds.length > 0
                          ? [
                            ...funds.map((fund) => ({
                              value: String(fund.id ?? 'Unknown'),
                              label: fund.name ?? 'Unknown',
                            })),
                          ]
                          : [{ value: 'no_funds', label: 'No funds found' }]
                    }
                  />
                </Grid>
              )
            }
            {
              (!fund && !investment) && watch('documentType') === 'investment' && (
                <Grid size={{ xs: 12 }}>
              <Select
                rounded={false}
                label="Company"
                name="company"
                control={uploadControl}
                options={
                  isCompaniesLoading
                    ? [{ value: '', label: 'Loading companies...' }]
                    : companies && companies.length > 0
                      ? [
                        ...companies.map((company) => ({
                          value: company.name,
                          label: company.name,
                        })),
                      ]
                      : [{ value: 'no_companies', label: 'No companies found' }]
                }
              />
            </Grid>
              )
            }

            <Grid size={{ xs: 12 }}>
              <Input
                rounded={false}
                label="Description"
                name="description"
                control={uploadControl}
                multiline
                rows={4}
                error={!!uploadErrors.description?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Input
                type="file"
                label="Upload File"
                name="file"
                control={uploadControl}
                error={!!uploadErrors.file?.message}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={uploadIsLoading}>
          Cancel
        </Button>
        <Button
          onClick={submitForm}
          variant="contained"
          disabled={uploadIsLoading}
          sx={{
            bgcolor: 'black',
            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
          }}
        >
          {uploadIsLoading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDocumentModal;
