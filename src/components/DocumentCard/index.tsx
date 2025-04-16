import { Typography } from "@mui/material";
import { Document } from "../../types";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import Card from "../Card";
import { useDeleteDocumentMutation, useLazyDownloadDocumentQuery } from "../../services/api/baseApi";

const DocumentCard: React.FC<{ document: Document }> = ({ document: doc }) => {
  const [deleteDoc, { isLoading: isDeleting }] = useDeleteDocumentMutation();
  const [triggerDownload, { isFetching }] = useLazyDownloadDocumentQuery();
  const handleDocDelete = async (id) => {
    console.log('Deleting document with ID:', id);
    try {
      await deleteDoc(Number(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  }

  const handleDocDownload = async (id: any) => {
    console.log('Downloading document with ID:', id);
    try {
      const result = await triggerDownload(id).unwrap();

      const fileUrl = (result as any).file_url;
      const fileName = (result as any).file_name || 'document';

      if (fileUrl) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error('Missing file URL in API response.');
      }
    } catch (err) {
      console.error('Failed to download the document:', err);
    }
  };

  return (
    <div >
      <Card
        onClick={() => { }}
        onDelete={() => handleDocDelete(doc.id)}
        onDownload={ () => handleDocDownload(doc.id)}
        // title={document.name}
        // subtitle={document.company_name}
        avatar={
          <DescriptionOutlinedIcon sx={{ fontSize: 40, color: 'text.primary' }} />
        }
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
        <Typography variant="body1" component="h2" sx={{
          fontWeight: '500', mb: 1, overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '1',
          WebkitBoxOrient: 'vertical',
        }}>
          {doc.name}
        </Typography>
        <Typography variant="subtitle2" component="p" sx={{
          color: 'text.secondary', fontWeight: '500', overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '1',
          WebkitBoxOrient: 'vertical',
        }}>
          {doc.company_name}
        </Typography>
      </Card>
    </div>

  );
};

export default DocumentCard;