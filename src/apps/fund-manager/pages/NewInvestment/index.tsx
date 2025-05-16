import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Card, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useNewInvestmentForm from './hooks/useNewInvestmentForm';
import Input from '@components/Input';
import Select from '@components/Select';
import Button from '@components/Button';
import { Routes } from '@constants/routes';
import { formContainerStyles } from '@utils/uiUtils';
import { useGetCompaniesQuery, useGetFundsQuery } from '../../../../services/api/baseApi';
import NewFundForm from '@components/NewFundForm';
import NewCompanyForm from '../../../../components/NewCompanyForm';
import { formatNumberWithCommas } from '@utils/index'; // helper utils

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
    setValue,
  } = useNewInvestmentForm(params?.investmentId || null);

  const investmentType = watch('investmentType');
  const company = watch('company');
  const fund = watch('fund');
  const { fundId, fundName } = useLocation().state || {};
  const { data: companies, isLoading: isCompaniesLoading } = useGetCompaniesQuery();
  const { data: funds, isLoading: isFundsLoading } = useGetFundsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  // Handle open company modal
  useEffect(() => {
    if (company === 'add_new_company') {
      setIsCompanyModalOpen(true);
    } else {
      setIsCompanyModalOpen(false);
    }
  }, [company]);

  // Handle open fund modal
  useEffect(() => {
    if (fund === 'add_new_fund') {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [fund]);

  // Handle selecting newly created fund
  const handleSelectCreatedFund = (createdFund) => {
    setFundValue(createdFund.id.toString());
    setIsModalOpen(false);
  };

  // Special input handler to format number fields with commas
  const handleNumberFieldChange = (name: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (isNaN(Number(rawValue))) return;
    const formattedValue = Number(rawValue).toLocaleString('en-US');
    setValue(name, formattedValue, { shouldValidate: true });
  };

  const usd = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ color: 'text.secondary', mr: 1 }}>$</Typography>
    </Box>
  );

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
            {/* Company Select */}
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
                onValueChange={(val) => {
                  if (val === 'add_new_company') {
                    setIsCompanyModalOpen(true);
                  }
                }}
              />

            </Grid>

            {/* Investment Fields */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                startAdornment={usd}
                rounded={false}
                label="Invested Amount"
                name="investedAmount"
                control={control}
                onChange={handleNumberFieldChange('investedAmount')}
                error={!!errors.investedAmount?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                startAdornment={usd}
                rounded={false}
                label="Estimated Current Value"
                name="estimatedValue"
                control={control}
                onChange={handleNumberFieldChange('estimatedValue')}
                error={!!errors.estimatedValue?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                startAdornment={usd}
                rounded={false}
                label="Post Money Valuation"
                name="postMoneyValuation"
                control={control}
                onChange={handleNumberFieldChange('postMoneyValuation')}
                error={!!errors.postMoneyValuation?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Input
                rounded={false}
                label="Investment Date"
                type="date"
                name="investmentDate"
                control={control}
                error={!!errors.investmentDate?.message}
              />
            </Grid>

            {/* Investment Type */}
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

            {/* Fund Select */}
            <Grid size={{ xs: 12, md: 6 }}>
              {
                fundName ? (
                  <>
                  <label htmlFor="fundName" className="text-sm font-medium text-gray-700">Fund</label>

                  <div className="border  rounded-md p-2 bg-gray-100">
                    <Typography variant="body1" sx={{ color: 'text.secondary', mr: 1 }}>{fundName}</Typography>
                    </div>
                  </>
                ) : (
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
                )
              }
            </Grid>

            {/* Status Field */}
            <Grid size={{ xs: 12 }}>
              <Input
                rounded={false}
                label="Status"
                name="status"
                multiline
                rows={4}
                control={control}
                error={!!errors.status?.message}
              />
            </Grid>

            {/* Buttons */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate(Routes.FUND_MANAGER)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isLoading}>
                  {isLoading ? <CircularProgress size={24} /> : 'Save'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Card>

      {/* Modals for adding new Fund / Company */}
      <Dialog open={isCompanyModalOpen}>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <NewCompanyForm
            onClose={() => setIsCompanyModalOpen(false)}
            selectCreatedCompany={setCompanyValue}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isModalOpen}>
        <DialogTitle>Add New Fund</DialogTitle>
        <DialogContent>
          <NewFundForm
            onSave={() => setIsModalOpen(false)}
            onClose={() => setFundValue('')}
            selectCreatedFund={handleSelectCreatedFund}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NewInvestment;
