import { Box, CircularProgress } from "@mui/material";
import DocumentCard from "../DocumentCard";
import { AnimatePresence, motion } from "framer-motion";
import { Document } from "../../types";

type DocumentsListProps = {
  documents: Document[] | undefined;
  isLoading?: boolean;
  selectedOrientation?: "row" | "grid";
};
const DocumentsList = ({ documents, isLoading, selectedOrientation }: DocumentsListProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (documents.length === 0 && !isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <p>No documents available</p>
      </Box>
    )
  }

  return (
    <>
      {documents && documents?.length > 0 && (

        <div className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(224px, 1fr))',
        }}>
          <AnimatePresence mode="popLayout">
            {documents.map((document) => (
              <motion.div
                key={document.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                  <DocumentCard orientation={selectedOrientation} document={document} />
              </motion.div>
            ))}
          </AnimatePresence>

        </div>
      )}
    </>
  )
}

export default DocumentsList;