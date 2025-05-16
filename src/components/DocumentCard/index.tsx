import { Box, CardContent, IconButton, Typography, Card, CircularProgress } from "@mui/material";
import { Document } from "../../types";
import { useDeleteDocumentMutation, useLazyDownloadDocumentQuery } from "../../services/api/baseApi";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "../Button";
import { useState } from "react";
import { Apps } from "../../constants/apps";
import { useAppContext } from "@src/context/appContext";
import DocViewer from "../DocViewer";

const DocumentCard: React.FC<{ document: Document, orientation: "row" | "grid" }> = ({ document: doc, orientation }) => {
  const [deleteDoc, { isLoading: isDeleteDocLoading }] = useDeleteDocumentMutation();
  const [triggerDownload, { isLoading }] = useLazyDownloadDocumentQuery();
  const [docLink, setDocLink] = useState<string | null>(null);
  const { app } = useAppContext();

  const handleDocDelete = async (id: number) => {
    try {
      await deleteDoc(id).unwrap();
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const handleDocDownload = async (id: number) => {
    try {
      const blob = await triggerDownload(id).unwrap();
      const fileUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `document-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileUrl);
    } catch (err) {
      console.error('Failed to download the document:', err);
    }
  };

  const handleDocView = async (id: number) => {
    try {
      const blob = await triggerDownload(id).unwrap();
      const fileUrl = window.URL.createObjectURL(blob);
      setDocLink(fileUrl);
    } catch (err) {
      console.error('Failed to view the document:', err);
    }
  };

  const handleCloseViewer = () => {
    setDocLink(null);
  };



  return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: '200px',
          width: '224px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }
        }}
      >
        <CardContent sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          '&:last-child': { pb: 2 },
          position: 'relative',
        }}>
          {
            isLoading || isDeleteDocLoading && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-100">
                <CircularProgress size={24} sx={{ color: 'gray' }} />
              </div>
            )
          }

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

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 'auto'
          }}>
            {app !== Apps.LIMITED_PARTNER && (
              <IconButton
                size="small"
                onClick={() => handleDocDelete(doc.id)}
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
            )}

            <Button
              variant="contained"
              sx={{
                bgcolor: 'gray',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'gray',
                  boxShadow: 'none'
                }
              }}
              onClick={() => {
                handleDocView(doc.id);

              }}
              size="small"
            >
              View
            </Button>

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

      {docLink && (
        <DocViewer
          open={Boolean(docLink)}
          docLink={docLink}
          onClose={handleCloseViewer}
        />
      )}
    </>
  );
};

export default DocumentCard;
