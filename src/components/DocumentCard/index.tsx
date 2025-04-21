import { Typography } from "@mui/material";
import { Document } from "../../types";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import Card from "../Card";
import { useDeleteDocumentMutation, useLazyDownloadDocumentQuery } from "../../services/api/baseApi";
import DocIcon from '@assets/doc.svg';
import LimitedPartner from '../../apps/fund-manager/pages/LimitedPartner/index';
import { Apps } from "../../constants/apps";
import { useAppContext } from "@src/context/appContext";

const DocumentCard: React.FC<{ document: Document, orientation: "row" | "grid" }> = ({ document: doc, orientation }) => {
  const [deleteDoc, { isLoading: isDeleting }] = useDeleteDocumentMutation();
  const [triggerDownload, { isFetching }] = useLazyDownloadDocumentQuery();
  const {app} = useAppContext();
  const handleDocDelete = async (id) => {
    try {
      await deleteDoc(Number(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  }

  const handleDocDownload = async (id: any) => {  
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
      </Card>
    </div>

  );
};

export default DocumentCard;