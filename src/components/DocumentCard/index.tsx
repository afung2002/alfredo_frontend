import { Box, Button, Dialog, DialogTitle, Modal, Paper, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Document } from "../../types";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useState, forwardRef } from "react";
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DocumentCard: React.FC<{ document: Document }> = ({ document }) => {
  const [openDocViewModal, setOpenDocViewModal] = useState(false);
  const handleDelete = () => {
    console.log('file deleted');
  };
  return (
    <>
    <Paper
      variant="outlined"
      className="transition-shadow duration-200  gap-4 overflow-wrap w-full h-28"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: '16px',
        borderRadius: '6px',
        cursor: "pointer",
        backgroundColor: 'grey.100',
        overflow: 'wrap',
        width: '100%',
        ':hover': {
          backgroundColor: '#f5f5f5',
        }
      }}
    >
        {/* File name at the top */}
        <Typography 
          variant="subtitle2" 
          className="break-all"
          sx={{ 
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            alignSelf: 'flex-start',
            wordBreak: 'break-all',
          }}
        >
          {document.file}
        </Typography>

        {/* Centered icon */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <DescriptionOutlinedIcon sx={{ 
            fontSize: 48,
            // color: 'black'
          }} />
        </Box>

        {/* Bottom actions row */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mt: 'auto',
          width: '100%',
        }}>
          {/* Delete button */}
          <IconButton 
            size="small"
            onClick={handleDelete}
            sx={{
              color: 'black',
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.08)'
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
            <div>
            <Button 
            onClick={() => setOpenDocViewModal(true)}
            sx={{
              textTransform: 'none',
            }}>View</Button>
            <IconButton 
            size="small" 
            color="primary"
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.08)'
              }
            }}
          >
            <DownloadIcon />
          </IconButton>
            </div>
          {/* Download button */}
          
        </Box>
    </Paper>
    <Dialog
    TransitionComponent={Transition}
      open={openDocViewModal}
      onClose={() => setOpenDocViewModal(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
       <DialogTitle>Document</DialogTitle>
    </Dialog>
    </>
    
  );
};        

export default DocumentCard;