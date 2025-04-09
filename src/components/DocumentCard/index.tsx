import { Box, Button, Paper, Typography } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { IconButton } from "@mui/material";
import { Document } from "../../types";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
const DocumentCard: React.FC<{ document: Document }> = ({ document }) => {
  const handleDelete = () => {
    console.log('file deleted');
  };
  return (
    <Paper
      variant="outlined"
      className="transition-shadow duration-200 flex flex-col gap-4"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: '16px',
        borderRadius: '6px',
        cursor: "pointer",
        backgroundColor: 'grey.100',

        ':hover': {
          backgroundColor: '#f5f5f5',
        }
      }}
    >
        {/* File name at the top */}
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            alignSelf: 'flex-start',
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
            <Button sx={{
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
  );
};        

export default DocumentCard;