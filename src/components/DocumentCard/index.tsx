import { Box, CardContent, IconButton, Typography, Card } from "@mui/material";
import { Document } from "../../types";

// import Card from "../Card";
import { useDeleteDocumentMutation, useLazyDownloadDocumentQuery } from "../../services/api/baseApi";
import DocIcon from '@assets/doc.svg';
import LimitedPartner from '../../apps/fund-manager/pages/LimitedPartner/index';
import { Apps } from "../../constants/apps";
import { useAppContext } from "@src/context/appContext";
import FileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "../Button";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';const DocumentCard: React.FC<{ document: Document, orientation: "row" | "grid" }> = ({ document: doc, orientation }) => {
  const [deleteDoc, { isLoading: isDeleting }] = useDeleteDocumentMutation();
  const [triggerDownload, { isFetching }] = useLazyDownloadDocumentQuery();
  const { app } = useAppContext();
  const handleDocDelete = async (id) => {
    try {
      await deleteDoc(Number(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  }

  const handleDocDownload = async (id: number) => {
    try {
      const blob = await triggerDownload(id).unwrap();
      const fileUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `document-${id}.pdf`; // or a better name if you have one
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileUrl); // cleanup
    } catch (err) {
      console.error('Failed to download the document:', err);
    }
  };

  return (
    <div >
      {/* <Card
        onClick={() => { }}
        onDelete={app === Apps.LIMITED_PARTNER ? undefined : () => handleDocDelete(doc.id)}
        onDownload={() => handleDocDownload(doc.id)}
        title={doc.name}
        orientation={orientation}
        subtitle={
          <Typography variant="subtitle2" component="p" sx={{
            color: 'text.secondary', fontWeight: '500', overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
          }}>
            {doc.company_name}
          </Typography>
        }
        sideImage={DocIcon}
        className="transition-shadow duration-200"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: '24px',
          borderRadius: '6px',
          cursor: "pointer",
          mb: '8px',
          backgroundColor: 'grey.100',
          ':hover': {
            backgroundColor: '#f5f5f5',
          }
        }}
      >
        <Typography variant="subtitle2" component="p" sx={{
          color: 'text.secondary', fontWeight: '500', overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
        }}>
          {doc.description}
        </Typography>
      </Card> */}
      <Card
        variant="outlined"
      sx={{
        height: '200px', // Fixed height for consistent card size
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }
      }}>
        <CardContent sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          '&:last-child': { pb: 2 }, // Override Material-UI's default padding
        }}>
          {/* File name at the top */}
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {doc.name ?? 'Untitled Document'}
          </Typography>

          {/* Centered icon */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <DescriptionOutlinedIcon sx={{
              fontSize: 60,
              color: 'black'
            }} />
          </Box>

          {/* Bottom actions row */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 'auto'
          }}>
            {/* Delete button */}
            {
              app === Apps.LIMITED_PARTNER ? null : (
                <IconButton
                  size="small"
                  onClick={app === Apps.LIMITED_PARTNER ? undefined : () => handleDocDelete(doc.id)}
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
              )

            }

            <Button variant="contained" sx={{bgcolor: 'gray', boxShadow: 'none', '&:hover' :{
              bgcolor: 'gray',
              boxShadow: 'none'
            }}} onClick={() => { if (app === Apps.LIMITED_PARTNER) { handleDocDownload(doc.id)
            }}} size="small">View</Button>
            {/* Download button */}
            <IconButton
              onClick={() => handleDocDownload(doc.id)}
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
          </Box>
        </CardContent>
      </Card>
    </div>

  );
};

export default DocumentCard;