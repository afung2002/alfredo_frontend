import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';
import Input from '@components/Input';
import Button from '@components/Button';
import useUploadDocumentForm from './hooks/useUploadDocumentForm';

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
  const {
    uploadControl,
    submitForm,
    uploadErrors,
    uploadIsLoading,
  } = useUploadDocumentForm(() => {
    onDocumentUploaded();
    onClose();
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload New Document</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={3}>
          <Grid  size={{xs: 12}}>
              <Input
                rounded={false}
                label="Company Name"
                name="companyName"
                control={uploadControl}
                error={!!uploadErrors.companyName?.message}
              />
            </Grid>

            <Grid  size={{xs: 12}}>
              <Input
                rounded={false}
                label="Description"
                name="description"
                control={uploadControl}
                multiline
                rows={4}
                error={!!uploadErrors.description?.message}
              />
            </Grid>

            <Grid  size={{xs: 12}}>
              <Input
                type="file"
                label="Upload File"
                name="file"
                control={uploadControl}
                error={!!uploadErrors.file?.message}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={uploadIsLoading}>
          Cancel
        </Button>
        <Button
          onClick={submitForm}
          variant="contained"
          disabled={uploadIsLoading}
          sx={{
            bgcolor: 'black',
            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
          }}
        >
          {uploadIsLoading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDocumentModal;
