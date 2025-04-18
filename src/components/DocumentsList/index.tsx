import { Box, CircularProgress } from "@mui/material";
import DocumentCard from "../DocumentCard";
import { AnimatePresence, motion } from "framer-motion";
import { Document } from "../../types";

type DocumentsListProps = {
  documents: Document[] | undefined;
  isLoading?: boolean;
};
const DocumentsList = ({ documents, isLoading }: DocumentsListProps) => {
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

  if (!documents || documents.length === 0 && !isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <p>No documents available</p>
      </Box>
    )
  }

  return (
    <>
      {documents && documents?.length > 0 && (

        <div className="w-full flex flex-col gap-4">
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
                <div className="w-full">
                  <DocumentCard document={document} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

        </div>
      )}
    </>
  )
}

export default DocumentsList;