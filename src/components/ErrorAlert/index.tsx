import React from 'react';
import { Alert, Box } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorMessages } from '../../constants/errorMessages';

interface ErrorAlertProps {
  error: unknown;
  fallbackMessage?: string;
  fullWidth?: boolean;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  fallbackMessage = 'An unexpected error occurred.',
  fullWidth = true,
}) => {
  if (!error || typeof error !== 'object' || !('status' in error)) return null;

  const typedError = error as FetchBaseQueryError;
  const message =
    ErrorMessages[typedError.status as keyof typeof ErrorMessages] || fallbackMessage;

  return (
    <Box p={fullWidth ? 3 : 0}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
};

export default ErrorAlert;
