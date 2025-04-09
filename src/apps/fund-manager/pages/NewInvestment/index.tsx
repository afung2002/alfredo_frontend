import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Alert,
  CircularProgress,
  Card,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createInvestment, getInvestmentById, updateInvestment, getUserFunds } from '@services/index';
import { userId } from '@constants/index';
import { handleInputChange, handleNumberInputChange, formatCurrency, parseCurrency } from '@utils/formUtils';
import { validateEmail, validateUrl, validateRequired, validateNumber, validateDate } from '@utils/validationUtils';
import { formContainerStyles, formFieldStyles, submitButtonStyles, cancelButtonStyles, headerStyles, loadingContainerStyles, errorContainerStyles } from '@utils/uiUtils';
import { ArrowBack } from '@mui/icons-material';
import { Fund } from '../../../../types';

const NewInvestment: React.FC = () => {
  const navigate = useNavigate();
  const { investmentId } = useParams<{ investmentId: string }>();
  const [loading, setLoading] = useState(false);
  const [userFunds, setUserFunds] = useState<Fund[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const editing = Boolean(investmentId);

  const [formData, setFormData] = useState({
    companyName: "",
    websiteUrl: "",
    founderEmail: "",
    description: "",
    amount: "",
    estimatedValue: "",
    investmentDate: "",
    postMoneyValuation: "",
    type: 'Fund',
    fundInvested: "",
    status: '',
  });

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!validateRequired(formData.companyName)) {
      errors.companyName = 'Company name is required';
    }
    if (!validateUrl(formData.websiteUrl)) {
      errors.websiteUrl = 'Please enter a valid URL';
    }
    if (!validateEmail(formData.founderEmail)) {
      errors.founderEmail = 'Please enter a valid email address';
    }
    if (!validateNumber(formData.amount)) {
      errors.amount = 'Please enter a valid amount';
    }
    if (!validateNumber(formData.estimatedValue)) {
      errors.estimatedValue = 'Please enter a valid estimated value';
    }
    if (!validateNumber(formData.postMoneyValuation)) {
      errors.postMoneyValuation = 'Please enter a valid post-money valuation';
    }
    if (!validateDate(formData.investmentDate)) {
      errors.investmentDate = 'Please enter a valid date';
    }
    if (formData.type === 'Fund' && !formData.fundInvested) {
      errors.fundInvested = 'Please select a fund';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const investmentData = {
        ...formData,
        userId,
        amount: parseCurrency(formData.amount),
        estimatedValue: parseCurrency(formData.estimatedValue),
        postMoneyValuation: parseCurrency(formData.postMoneyValuation),
      };

      await createInvestment(investmentData);
      navigate(-1);
    } catch (err) {
      setError('Failed to create investment. Please try again.');
      console.error('Error creating investment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    if (!investmentId) {
      setError('Investment ID is required');
      return;
    }

    try {
      const investmentData = {
        ...formData,
        userId,
        amount: parseCurrency(formData.amount),
        estimatedValue: parseCurrency(formData.estimatedValue),
        postMoneyValuation: parseCurrency(formData.postMoneyValuation),
      };

      await updateInvestment(investmentId, investmentData);
      navigate(-1);
    } catch (err) {
      setError('Failed to update investment. Please try again.');
      console.error('Error updating investment:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's funds
        const funds = await getUserFunds(userId);
        setUserFunds(funds);

        // If editing, fetch investment details
        if (editing && investmentId) {
          const investment = await getInvestmentById(investmentId);
          setFormData({
            ...investment,
            amount: formatCurrency(investment.amount),
            estimatedValue: formatCurrency(investment.estimatedValue),
            postMoneyValuation: formatCurrency(investment.postMoneyValuation),
          });
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [editing, investmentId, userId]);

  if (loading) {
    return (
      <Box sx={loadingContainerStyles}>
        <CircularProgress />
      </Box>
    );
  }

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
        <ArrowBack fontSize="small" sx={{ mr: "3px" }} />
        Back
      </Button>
      <Typography variant="h5" component="h1" sx={headerStyles}>
        {editing ? "Edit Investment" : "Add New Investment"}
      </Typography>

      {error && (
        <Alert severity="error" sx={errorContainerStyles}>
          {error}
        </Alert>
      )}
      <Card sx={{
        border: "1px solid",
        borderColor: "grey.200",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        p: "30px"
      }}>
        <form onSubmit={editing ? handleUpdate : handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{xs: 12, md: 6}}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange(e, setFormData)}
                required
                error={!!validationErrors.companyName}
                helperText={validationErrors.companyName}
                sx={formFieldStyles}
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <TextField
                fullWidth
                label="Website URL"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange(e, setFormData)}
                required
                error={!!validationErrors.websiteUrl}
                helperText={validationErrors.websiteUrl}
                sx={formFieldStyles}
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <TextField
                fullWidth
                label="Founder Email"
                name="founderEmail"
                type="email"
                value={formData.founderEmail}
                onChange={(e) => handleInputChange(e, setFormData)}
                required
                error={!!validationErrors.founderEmail}
                helperText={validationErrors.founderEmail}
                sx={formFieldStyles}
              />
            </Grid>

            <Grid size={{xs: 12}}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>, setFormData)}
                sx={formFieldStyles}
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <TextField
                fullWidth
                label="Investment Amount"
                name="amount"
                value={formData.amount}
                onChange={(e) => handleNumberInputChange(e as ChangeEvent<HTMLInputElement>, setFormData)}
                required
                error={!!validationErrors.amount}
                helperText={validationErrors.amount}
                InputProps={{
                  startAdornment: '$',
                }}
                sx={formFieldStyles}
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <TextField
                fullWidth
                label="Estimated Current Value"
                name="estimatedValue"
                value={formData.estimatedValue}
                onChange={(e) => handleNumberInputChange(e as ChangeEvent<HTMLInputElement>, setFormData)}
                required
                error={!!validationErrors.estimatedValue}
                helperText={validationErrors.estimatedValue}
                InputProps={{
                  startAdornment: '$',
                }}
                sx={formFieldStyles}
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <TextField
                fullWidth
                label="Post-Money Valuation"
                name="postMoneyValuation"
                value={formData.postMoneyValuation}
                onChange={(e) => handleNumberInputChange(e as ChangeEvent<HTMLInputElement>, setFormData)}
                required
                error={!!validationErrors.postMoneyValuation}
                helperText={validationErrors.postMoneyValuation}
                InputProps={{
                  startAdornment: '$',
                }}
                sx={formFieldStyles}
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <TextField
                fullWidth
                label="Investment Date"
                name="investmentDate"
                type="date"
                value={formData.investmentDate}
                onChange={(e) => handleInputChange(e, setFormData)}
                required
                error={!!validationErrors.investmentDate}
                helperText={validationErrors.investmentDate}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={formFieldStyles}
              />
            </Grid>
            <Grid size={{xs: 12, md: 6}}>
              <TextField
                fullWidth
                select
                label="Investment Type"
                name="type"
                value={formData.type}
                onChange={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>, setFormData)}
                required
                sx={formFieldStyles}
              >
                <MenuItem value="Fund">Fund</MenuItem>
                <MenuItem value="Angel">Angel</MenuItem>
              </TextField>
            </Grid>
            {formData.type === 'Fund' && (
              <Grid size={{xs: 12, md: 6}}>
                <TextField
                  fullWidth
                  select
                  label="Fund"
                  name="fundInvested"
                  value={formData.fundInvested}
                  onChange={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>, setFormData)}
                  required
                  error={!!validationErrors.fundInvested}
                  helperText={validationErrors.fundInvested}
                  sx={formFieldStyles}
                >
                  {userFunds.map((fund) => (
                    <MenuItem key={fund.id} value={fund.id}>
                      {fund.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
            <Grid size={{xs: 12}}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Latest Status"
                name="status"
                value={formData.status}
                onChange={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>, setFormData)}
                sx={formFieldStyles}
              />
            </Grid>
            <Grid size={{xs: 12}} >
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={cancelButtonStyles}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={submitButtonStyles}
                >
                  {editing ? 'Update' : 'Save'} 
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
