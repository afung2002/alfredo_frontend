import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { createDocument } from '@services/index';

interface UploadDocumentModalProps {
  open: boolean;
  onClose: () => void;
  onDocumentUploaded: () => void;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  open,
  onClose,
  onDocumentUploaded,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleUploadDocument = async () => {
    if (!file || !companyName || !description) {
      setError('Please fill in all fields and select a file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createDocument({
        file,
        companyName,
        description,
        type: 'Investment', // Default type
      });
      
      onDocumentUploaded();
      onClose();
    } catch (err) {
      setError('Failed to upload document. Please try again.');
      console.error('Error uploading document:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload New Document</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
            required
          />
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Upload File
            </Typography>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                variant="outlined"
                component="span"
                sx={{ textTransform: 'none' }}
              >
                {file ? file.name : 'Choose File'}
              </Button>
            </label>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleUploadDocument}
          variant="contained"
          disabled={loading}
          sx={{
            bgcolor: 'black',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.8)',
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDocumentModal; 