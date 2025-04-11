import React from 'react';
import { Box, Typography, Grid, CircularProgress, Card } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useNewFundForm from './hooks/useNewFundForm';
import Input from '@components/Input'; // your custom input wrapper
import { formContainerStyles } from '@utils/uiUtils';
import { Routes } from '@constants/routes';
import Button from '../../../../components/Button';

const NewFund: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    errors,
    isLoading,
  } = useNewFundForm();

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
        Add Fund
      </Typography>

      <Card sx={{
        border: "1px solid",
        borderColor: "grey.200",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        p: "30px"
      }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{xs: 12, md: 6}}>
              <Input
              rounded={false}
                label='Fund Name'
                type="text"
                name="name"
                control={control}
                error={errors.name?.message}
              />
            </Grid>

            <Grid size={{xs: 12, md: 6}}>
              <Input
                rounded={false}
                label='Website URL'
                type="text"
                name="websiteUrl"
                control={control}
                error={!!errors.websiteUrl?.message}
              />
            </Grid>

            <Grid size={{xs: 12}}>
              <Input
              rounded={false}
                label='Legal Entity'
                type="text"
                name="legalEntity"
                control={control}
                error={!!errors.legalEntity?.message}
              />
            </Grid>

            <Grid size={{xs: 12}}>
              <Input
              rounded={false}
                label='Description'
                multiline
                rows={5}
                name="description"
                control={control}
                error={!!errors.description?.message}
              />
            </Grid>

            <Grid size={{xs: 12, md: 6}}>
              <Input
              rounded={false}
                label='Fund Size'
                type="text"
                name="fundSize"
                control={control}
                error={!!errors.fundSize?.message}
              />
            </Grid>

            <Grid size={{xs: 12, md: 6}}>
              <Input
                rounded={false}
                label="Estimated Value"
                type="text"
                name="estimatedValue"
                control={control}
                error={!!errors.estimatedValue?.message}
              />
            </Grid>

            <Grid size={{xs: 12}}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(Routes.FUND_MANAGER_FUNDS)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    bgcolor: 'black',
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
                  }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Create Fund'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default NewFund;
