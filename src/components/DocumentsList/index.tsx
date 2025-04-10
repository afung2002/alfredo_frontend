import { Box, Grid, Typography } from "@mui/material";
import DocumentCard from "../DocumentCard";

type Document = {
  id: string;
  file: string;
  companyName: string;
  description: string;
  uploadDate: string;
};

type DocumentsListProps = {
  documents: Document[] | undefined;
};
const DocumentsList = ({documents}: DocumentsListProps) => {
  return (
    <>
    {documents && documents?.length > 0 ? (
        <Grid container spacing={3}>
          {documents.map((document, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={index}>
              <DocumentCard document={document} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Typography variant="body1">
            {(!documents || documents.length === 0) && "No documents found"}
          </Typography>
        </Box>
      )}
    </>
  )
}

export default DocumentsList;