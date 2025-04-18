import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Card, Collapse, Modal, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import useNewInvestmentForm from './hooks/useNewInvestmentForm';
import Input from '@components/Input';
import Select from '@components/Select';
import Button from '@components/Button';
import { Routes } from '@constants/routes';
import { formContainerStyles } from '@utils/uiUtils';
import { useGetCompaniesQuery, useGetFundsQuery, useGetLimitedPartnersQuery } from '../../../../services/api/baseApi';
import useNewFundForm from '@hooks/useNewFundForm';
import NewFundForm from '@components/NewFundForm';
import NewCompanyForm from '../../../../components/NewCompanyForm';

const NewInvestment: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    errors,
    isLoading,
    watch,
    setFundValue,
    setCompanyValue,

  } = useNewInvestmentForm(params?.investmentId || null);

  const investmentType = watch('investmentType');
  const company = watch('company');
  const fund = watch('fund');
  const { data: companies, isLoading: isCompaniesLoading, error: companiesError } = useGetCompaniesQuery();
  const { data: funds, isLoading: isFundsLoading, error: fundsError } = useGetFundsQuery()
  const { data: limitedPartners, isLoading: isLimitedPartnersLoading, error: limitedPartnersError } = useGetLimitedPartnersQuery();
  const [isNewCompany, setIsNewCompany] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  useEffect(() => {
    if (company === 'add_new_company') {
      setIsCompanyModalOpen(true);
    } else {
      setIsCompanyModalOpen(false);
    }
  }, [company]);

  useEffect(() => {
    if (fund === 'add_new_fund') {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [fund]);

  const handleSelectCreatedFund = (createdFund) => {
    setFundValue(createdFund.id.toString());
    setIsModalOpen(false);
  }

  const usd = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ color: 'text.secondary', mr: 1 }}>$</Typography>
    </Box>
  )
  return (
    <Box sx={formContainerStyles}>
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{
          textAlign: "left",
          color: "gray",
          ml: "-12px",
          mb: "20px",
          display: "flex",
          justifyContent: "flex-start",
          "&:hover": { color: "black" },
        }}
      >
        <ArrowBack fontSize="small" sx={{ mr: "3px" }} />
        Back
      </Button>

      <Typography variant="h5" component="h1" gutterBottom>
        Add Investment
      </Typography>

      <Card sx={{ border: '1px solid', borderColor: 'grey.200', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', p: '30px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Select
                rounded={false}
                label="Company"
                name="company"
                control={control}
                options={
                  isCompaniesLoading
                    ? [{ value: '', label: 'Loading companies...' }]
                    : companies && companies.length > 0
                      ? [
                        ...companies.map((company) => ({
                          value: company.id.toString(),
                          label: company.name,
                        })),
                        { value: 'add_new_company', label: '➕ Add new company' },
                      ]
                      : [{ value: 'add_new_company', label: '➕ Add new company' }]
                }
              />
            </Grid>


            <Grid size={{ xs: 12, md: 6 }}>
              <Input startAdornment={usd} rounded={false} label="Invested Amount" name="investedAmount" control={control} error={!!errors.investedAmount?.message} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Input startAdornment={usd} rounded={false} label="Estimated Current Value" name="estimatedValue" control={control} error={!!errors.estimatedValue?.message} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Input startAdornment={usd} rounded={false} label="Post Money Valuation" name="postMoneyValuation" control={control} error={!!errors.postMoneyValuation?.message} />
            </Grid>
            <Dialog open={isCompanyModalOpen}>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogContent>
                <NewCompanyForm onClose={() => setIsCompanyModalOpen(false)} 
                  selectCreatedCompany={setCompanyValue} />
              </DialogContent>
            </Dialog>

            <Grid size={{ xs: 12, md: 6 }}>
              <Input rounded={false} label="Investment Date" type="date" name="investmentDate" control={control} error={!!errors.investmentDate?.message} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Select
                rounded={false}
                label="Investment Type"
                name="investmentType"
                control={control}
                options={[
                  { value: 'FUND', label: 'Fund' },
                  { value: 'ANGEL', label: 'Angel' },
                ]}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Select
                rounded={false}
                label="Fund"
                name="fund"
                control={control}
                disabled={investmentType === 'ANGEL'}
                options={
                  isFundsLoading
                    ? [{ value: '', label: 'Loading funds...' }]
                    : funds && funds.length > 0
                      ? [
                        ...funds.map((fund) => ({
                          value: fund.id.toString(),
                          label: fund.name ?? 'Unknown',
                        })),
                        { value: 'add_new_fund', label: '➕ Add new fund' },
                      ]
                      : [{ value: 'add_new_fund', label: '➕ Add new fund' }]
                }
              />
            </Grid>
            <Dialog open={isModalOpen}>
              <DialogTitle>Add New Fund</DialogTitle>
              <DialogContent>
                <NewFundForm onSave={() => setIsModalOpen(false)} onClose={() => setFundValue('')} selectCreatedFund={handleSelectCreatedFund} />
              </DialogContent>
            </Dialog>
            <Grid size={{ xs: 12 }}>
              <Input rounded={false} label="Status" name="status" multiline rows={4} control={control} error={!!errors.status?.message} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate(Routes.FUND_MANAGER)} disabled={isLoading}>
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
      </Card>
    </Box>
  );
};

export default NewInvestment;
