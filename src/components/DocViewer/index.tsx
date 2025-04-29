import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

type DocViewerProps = {
  open: boolean;
  onClose: () => void;
  docLink: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const DocViewer: React.FC<DocViewerProps> = ({ open, onClose, docLink }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = docLink;
    link.download = '';
    link.target = '_blank';
    link.click();
  };

  return (
    <Dialog
      fullScreen
        
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            Document Viewer
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent dividers sx={{ p: 0 }}>
        <iframe
          src={docLink}
          title="Document"
          style={{
            width: '100%',
            height: 'calc(100vh - 64px)',
            border: 'none',
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DocViewer;
