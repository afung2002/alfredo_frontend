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