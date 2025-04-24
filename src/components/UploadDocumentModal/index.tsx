import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';
import Input from '@components/Input';
import Button from '@components/Button';
import useUploadDocumentForm from './hooks/useUploadDocumentForm';
import Select from '../Select';
import { useLazyGetCompaniesQuery, useLazyGetFundsQuery, useGetInvestmentsQuery } from '@services/api/baseApi';
import { useEffect, useState } from 'react';
import { getReferencedCompanies, getReferencedFunds } from '../../utils';

interface UploadDocumentModalProps {
  open: boolean;
  onClose: () => void;
  investmentId?: any;
  fundId?: any;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  open,
  onClose,
  investmentId,
  fundId
}) => {
  console.log(fundId, 'fundId')
  const [getFunds, { data: funds, isLoading: isFundsLoading, error: fundsError }] = useLazyGetFundsQuery();
  const { data: investments, isLoading: isInvestmentsLoading, error: investmentsError } = useGetInvestmentsQuery();
  const [getCompanies, { data: companies, isLoading: isCompaniesLoading, error: companiesError }] = useLazyGetCompaniesQuery();
  const [filteredFunds, setFilteredFunds] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const {
    uploadControl,
    submitForm,
    uploadErrors,
    uploadIsLoading,
    setValue,
    watch,
  } = useUploadDocumentForm(() => {
    onClose();
  }, investmentId, fundId);
  const documentType = watch('documentType');
  const fund = watch('fund');
  console.log(watch('company'), 'company')
  useEffect(() => {
    if (!documentType) return;
    switch (documentType) {
      case 'angel-investment':
        getCompanies();
        break;
      case 'fund-investment':
        getFunds();
        // getInvestments();
        getCompanies();
        break;
      case 'fund-management':
        getFunds();
        break;
      default:
        break;
    }
  }, [documentType]);

  useEffect(() => {
    if (documentType === 'fund-investment') {
      if (funds && funds.length > 0 && investments && investments.length > 0) {
        setFilteredFunds(getReferencedFunds(investments, funds))
      }
    }
  }, [documentType, funds, investments, companies]);
  useEffect(() => {
    // if (!fund || !) return;
    if (documentType === 'fund-investment') {
      setFilteredCompanies(getReferencedCompanies(investments, documentType, fund))
    } else if (documentType === 'angel-investment') {
      console.log('angel1')
      setFilteredCompanies(getReferencedCompanies(investments, documentType))
    }
  }, [fund, documentType, investments, companies]);

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
            {fundId || investmentId ? (null) : (
              <Grid size={{ xs: 12 }}>
                <Select
                  rounded={false}
                  label="Document Type"
                  name="documentType"
                  control={uploadControl}
                  options={[
                    { value: 'angel-investment', label: 'Angel Investment' },
                    { value: 'fund-investment', label: 'Fund Investment' },
                    { value: 'fund-management', label: 'Fund Management' },
                  ]}
                />
              </Grid>
            )}

            {
              (documentType === 'fund-investment') && (
                <Grid size={{ xs: 12 }}>
                  <Select
                    rounded={false}
                    label="Fund"
                    name="fund"
                    control={uploadControl}
                    options={
                      (isFundsLoading || isInvestmentsLoading)
                        ? [{ value: '', label: 'Loading funds...' }]
                        : filteredFunds && filteredFunds.length > 0
                          ? [
                            ...filteredFunds.map((fund) => ({
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
              (documentType === 'fund-management') && (
                <Grid size={{ xs: 12 }}>
                  <Select
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
              (documentType === 'angel-investment' || documentType === 'fund-investment') && (
                <Grid size={{ xs: 12 }}>
                  <Select
                    rounded={false}
                    label="Company"
                    name="company"
                    control={uploadControl}
                    options={
                      (isFundsLoading || isInvestmentsLoading)
                        ? [{ value: '', label: 'Loading companies...' }]
                        : filteredCompanies && filteredCompanies.length > 0
                          ? [
                            ...filteredCompanies.map((company) => ({
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
