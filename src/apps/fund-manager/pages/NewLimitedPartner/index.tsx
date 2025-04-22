import React from 'react';
import { Box, Typography, Grid, CircularProgress, Card } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { formContainerStyles } from '@utils/uiUtils';
import Input from '@components/Input';
import Button from '@components/Button';
import { useLimitedPartnerForm } from './hooks/useLimitedPartnerForm';

const NewLimitedPartner: React.FC = () => {
  const navigate = useNavigate();
  const { limitedPartnerId } = useParams<{ limitedPartnerId: string }>();
  const {
    control,
    handleSubmit,
    onSubmit,
    isFetching,
    isUpdating,
    fetchError,
  } = useLimitedPartnerForm(limitedPartnerId || '');

  if (isFetching) return <CircularProgress />;
  if (fetchError) return <Typography color="error">Failed to load data.</Typography>;

  return (
    <Box sx={formContainerStyles}>
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{
          textAlign: 'left',
          color: 'gray',
          ml: '-12px',
          mb: '20px',
          display: 'flex',
          justifyContent: 'flex-start',
          '&:hover': { color: 'black' },
        }}
      >
        <ArrowBack fontSize="small" sx={{ mr: '3px' }} />
        Back
      </Button>

      <Typography variant="h5" component="h1" gutterBottom>
        Edit Limited Partner
      </Typography>

      <Card sx={{ border: '1px solid', borderColor: 'grey.200', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', p: '30px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Input label="Website URL" name="website_url" control={control} />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Input label="Legal Entity" name="legal_entity" control={control} />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Input label="Description" name="description" control={control} />
            </Grid>

            <Grid size={{ xs: 12}}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={() => navigate(-1)} disabled={isUpdating}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isUpdating}>
                  {isUpdating ? <CircularProgress size={24} /> : 'Update'}
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
