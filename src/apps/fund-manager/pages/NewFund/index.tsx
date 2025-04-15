import React from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { formContainerStyles } from '@utils/uiUtils';
import Button from '@components/Button';
import NewFundForm from '@components/NewFundForm';
import Card from '../../../../components/Card';

const NewFund: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const fundId = params.fundId || null;
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
      <Card>
        <NewFundForm fundId={fundId} />
      </Card>
    </Box>
  );
};

export default NewFund;
