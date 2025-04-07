import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Alert, CircularProgress, Card } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createFund, getFundById, updateFund } from '@services/index';
import { userId } from '@constants/index';
import { ArrowBack } from '@mui/icons-material';
import { formContainerStyles } from '@utils/uiUtils';

const NewFund: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fundId } = useParams<{ fundId: string }>();

  const editing = fundId ? true : false;

  const [formData, setFormData] = useState({
    name: '',
    websiteUrl: '',
    description: '',
    legalEntity: '',
    fundSize: '',
    estimatedValue: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createFund({...formData, userId});
      navigate(-1);
    } catch (err) {
      setError('Failed to create fund. Please try again.');
      console.error('Error creating fund:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!fundId) {
      setError('Investment ID is required');
      return;
    }

    try {
      const fundData = {
        ...formData,userId,
      };

      await updateFund(fundId, fundData);
      navigate(-1);
    } catch (err) {
      setError('Failed to update investment. Please try again.');
      console.error('Error updating investment:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (editing && fundId) {
      const fetchInvestment = async () => {
        const investment = await getFundById(fundId);
        setFormData(investment);
      };
      fetchInvestment();
    }
  }, [editing, fundId]);

  return (
    <Box sx={formContainerStyles}>
      <Button
        variant="text"
        onClick={() => navigate(-1)}
        sx={{
          textAlign: "left",
          color: "gray",
          ml:"-12px",
          mb:"20px",
          display: "flex",
          justifyContent: "flex-start",
          "&:hover": {
            color: "black",
          },
        }}
      >
        <ArrowBack fontSize="small" sx={{mr:"3px",}}/>
        Back
      </Button>
      <Typography variant="h5" component="h1" gutterBottom>
        {editing ? 'Edit' : 'Add'} Fund
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card sx={{border: "1px solid",
          borderColor: "grey.200",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          p:"30px"}}>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="Fund Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="Website URL"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="Legal Entity"
              name="legalEntity"
              value={formData.legalEntity}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{xs: 12}}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={2}
              required
            />
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="Fund Size"
              name="fundSize"
              // type="number"
              value={formData.fundSize}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="Estimated Value"
              name="estimatedValue"
              value={formData.estimatedValue}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{xs: 12}}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/fundmanager-ai/funds')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                // type="submit"
                onClick={editing ? handleUpdate : handleSubmit}
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: 'black',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : editing ? 'Update Fund' : 'Create Fund'}
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
