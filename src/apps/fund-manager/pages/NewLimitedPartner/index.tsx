import React from 'react';
import { Box, Typography, Grid, CircularProgress, Card, Divider } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { formContainerStyles } from '@utils/uiUtils';
import Input from '@components/Input';
import Button from '@components/Button';
import useLimitedPartnerForm from './hooks/useLimitedPartnerForm';
import Select from '@components/Select';
import { useGetLimitedPartnersQuery } from '@services/api/baseApi';

const NewLimitedPartner: React.FC = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const { data: limitedPartnersData, isLoading: limitedPartnersLoading, error: limitedPartnersError } = useGetLimitedPartnersQuery();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
  } = useLimitedPartnerForm();
  console.log(errors, 'errors')
  console.log(fundId, 'id')

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
        Register Limited Partner
      </Typography>

      <Card sx={{ border: '1px solid', borderColor: 'grey.200', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', p: '30px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom>Select from existing</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Select
                rounded={false}
                label="Limited Partners"
                name="limitedPartners"
                control={control}
                options={
                  limitedPartnersLoading
                    ? [{ value: '', label: 'Loading limited partners...' }]
                    : limitedPartnersData && limitedPartnersData.length > 0
                      ? [
                        ...limitedPartnersData.map((lp) => ({
                          value: String(lp.user_id ?? 'Unknown'),
                          label: lp.legal_entity ?? 'Unknown',
                        })),
                      ]
                      : [{ value: 'no_limited_partner', label: 'No limited partner found' }]
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider sx={{my: 3}}>Or</Divider>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom>Invite new limited partner</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Input rounded={false} label="User ID" name="user_id" control={control} 
              // error={!!errors.user_id?.message}
               />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Input rounded={false} label="Website URL" name="website_url" control={control} 
              // error={!!errors.website_url?.message}
               />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Input rounded={false} label="Legal Entity" name="legal_entity" control={control}
              //  error={!!errors.legal_entity?.message}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Input rounded={false} label="Description" name="description" multiline rows={4} control={control}
              //  error={!!errors.description?.message} 
               />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate(-1)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isLoading}>
                  {isLoading ? <CircularProgress size={24} /> : 'Register'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default NewLimitedPartner;
