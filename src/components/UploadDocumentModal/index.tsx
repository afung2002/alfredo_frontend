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
  limitedPartnerId?: any;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  open,
  onClose,
  investmentId,
  fundId,
  limitedPartnerId,
}) => {
  const [getFunds, { data: funds, isLoading: isFundsLoading }] = useLazyGetFundsQuery();
  const [getCompanies, { data: companies }] = useLazyGetCompaniesQuery();
  const { data: investments, isLoading: isInvestmentsLoading } = useGetInvestmentsQuery();

  const [filteredFunds, setFilteredFunds] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isAngelInvestmentDisabled, setIsAngelInvestmentDisabled] = useState(true);
  const [isFundInvestmentDisabled, setIsFundInvestmentDisabled] = useState(true);

  const {
    uploadControl,
    submitForm,
    uploadErrors,
    uploadIsLoading,
    watch,
  } = useUploadDocumentForm(() => {
    onClose();
  }, investmentId, fundId, limitedPartnerId);

  const documentType = watch('documentType');
  const fund = watch('fund');

  useEffect(() => {
    if (open) {
      getFunds();
      getCompanies();
    }
  }, [open]);

  useEffect(() => {
    if (investments) {
      const angelCompanies = getReferencedCompanies(investments, 'angel-investment') || [];
      setIsAngelInvestmentDisabled(angelCompanies.length === 0);

      if (funds && funds.length > 0) {
        const referencedFunds = getReferencedFunds(investments, funds);
        setFilteredFunds(referencedFunds);
        setIsFundInvestmentDisabled(referencedFunds.length === 0);
      }
    }
  }, [investments, funds]);

  useEffect(() => {
    if (documentType === 'fund-investment') {
      const companiesList = getReferencedCompanies(investments, documentType, fund);
      setFilteredCompanies(companiesList || []);
    } else if (documentType === 'angel-investment') {
      const companiesList = getReferencedCompanies(investments, documentType);
      setFilteredCompanies(companiesList || []);
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

            {!fundId && !investmentId && !limitedPartnerId && (
              <Grid size={{ xs: 12 }}>
                <Select
                  rounded={false}
                  label="Document Type"
                  name="documentType"
                  control={uploadControl}
                  options={[
                    {
                      value: 'angel-investment',
                      label: 'Angel Investment',
                      isDisabled: isAngelInvestmentDisabled,
                    },
                    {
                      value: 'fund-investment',
                      label: 'Fund Investment',
                      isDisabled: isFundInvestmentDisabled,
                    },
                    {
                      value: 'fund-management',
                      label: 'Fund Management',
                    },
                  ]}
                />
              </Grid>
            )}

            {documentType === 'fund-investment' && (
              <Grid size={{ xs: 12 }}>
                <Select
                  rounded={false}
                  label="Fund"
                  name="fund"
                  control={uploadControl}
                  options={
                    isFundsLoading || isInvestmentsLoading
                      ? [{ value: '', label: 'Loading funds...' }]
                      : filteredFunds.length > 0
                        ? filteredFunds.map((fund) => ({
                            value: String(fund.id ?? 'Unknown'),
                            label: fund.name ?? 'Unknown',
                          }))
                        : [{ value: 'no_funds', label: 'No funds found' }]
                  }
                />
              </Grid>
            )}

            {(documentType === 'angel-investment' || documentType === 'fund-investment') && (
              <Grid size={{ xs: 12 }}>
                <Select
                  rounded={false}
                  label="Company"
                  name="company"
                  control={uploadControl}
                  options={
                    isFundsLoading || isInvestmentsLoading
                      ? [{ value: '', label: 'Loading companies...' }]
                      : filteredCompanies.length > 0
                        ? filteredCompanies.map((company) => ({
                            value: company.name,
                            label: company.name,
                          }))
                        : [{ value: 'no_companies', label: 'No companies found' }]
                  }
                />
              </Grid>
            )}

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
        <Button variant="outlined" onClick={onClose} disabled={uploadIsLoading}>
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
