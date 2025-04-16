import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Card, Collapse } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import useNewInvestmentForm from './hooks/useNewInvestmentForm';
import Input from '@components/Input';
import Select from '@components/Select';
import Button from '@components/Button';
import { Routes } from '@constants/routes';
import { formContainerStyles } from '@utils/uiUtils';
import { useGetCompaniesQuery, useGetFundsQuery, useGetLimitedPartnersQuery } from '../../../../services/api/baseApi';
import useNewFundForm from '../../../../hooks/useNewFundForm';

const NewInvestment: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    watch,
  } = useNewInvestmentForm(params?.investmentId || null);
  
  const {
    newFundControl,
    submitNewFund,
    newFundErrors,
    newFundIsLoading,
  } = useNewFundForm(null);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      let fundId: string | null = null;
  
      if (fund === 'add_new_fund') {
        const success = await submitNewFund();
        if (!success) return;
        fundId = success; // assuming this returns fund ID
      }
  
      const wrapped = handleSubmit((data) => onSubmit(data, fundId));
      await wrapped(e); // this will now work correctly
  
    } catch (error) {
      console.error('Error in full form submission:', error);
    }
  };
  
  
  
  
  
  const investmentType = watch('investmentType');
  const company = watch('company');
  const fund = watch('fund');
  const { data: companies, isLoading: isCompaniesLoading, error: companiesError } = useGetCompaniesQuery();
  const { data: funds, isLoading: isFundsLoading, error: fundsError } = useGetFundsQuery()
  const { data: limitedPartners, isLoading: isLimitedPartnersLoading, error: limitedPartnersError } = useGetLimitedPartnersQuery();
  const [isNewCompany, setIsNewCompany] = useState(false);

  useEffect(() => {
    if (company === 'add_new_company') {
      setIsNewCompany(true);
    } else {
      setIsNewCompany(false);
    }
  }, [company]);

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
        <form onSubmit={onSubmitHandler}>
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
              <Input disabled={!isNewCompany} rounded={false} label="New Company" name="newCompany" control={control} error={!!errors.company?.message} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Input rounded={false} label="Website URL" name="websiteUrl" control={control} error={!!errors.websiteUrl?.message} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Input rounded={false} label="Founder Email" name="founderEmail" control={control} error={!!errors.founderEmail?.message} />
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

            <Grid size={{ xs: 12 }}>
              <Input rounded={false} label="Description" name="description" multiline rows={4} control={control} error={!!errors.description?.message} />
            </Grid>

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

            <Grid size={{ xs: 12 }}>
              {
                investmentType === 'ANGEL' && (
                  <Select
                    rounded={false}
                    label="Limited Partner"
                    name="limitedPartner"
                    control={control}
                    // disabled={investmentType === 'FUND'}
                    options={
                      isLimitedPartnersLoading
                        ? [{ value: '', label: 'Loading limited partners...' }]
                        : limitedPartners && limitedPartners.length > 0
                          ? [
                            ...limitedPartners.map((partner) => ({
                              value: partner.user_id.toString(),
                              label: partner.legal_entity ?? 'Unknown',
                            })),
                            { value: 'add_new', label: '➕ Add new LP' },
                          ]
                          : [{ value: 'add_new', label: '➕ Add new LP' }]
                    }
                  />
                )
              }
              {
                investmentType === 'FUND' && (
                  <Select
                    rounded={false}
                    label="Fund"
                    name="fund"
                    control={control}
                    // disabled={investmentType === 'ANGEL'}
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
            <Collapse in={fund === 'add_new_fund'} timeout="auto" unmountOnExit>
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
              </Grid>
            </Collapse>
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
                  {isLoading || newFundIsLoading ? <CircularProgress size={24} /> : 'Save'}
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
