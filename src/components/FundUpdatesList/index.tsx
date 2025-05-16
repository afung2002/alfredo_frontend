import { Alert, CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import { FundUpdate } from "../../types";
import UpdateCard from "@components/UpdateCard";
import { AnimatePresence, motion } from "framer-motion";
import ErrorAlert from "../ErrorAlert";

const FundUpdatesList = ({ updates, isLoading, error}: any) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };
  if (error) {
    return (
      <ErrorAlert error={error} />
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!updates || updates.length === 0 && !isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <p>No updates available</p>
      </Box>
    )
  }


  return (
    <Box sx={{ gap: 1 }}>
      <AnimatePresence mode="popLayout">
      {updates.map((update: FundUpdate) => (
        <motion.div
        key={update.id}
        layout
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <UpdateCard key={update.id} update={update} />
        </motion.div>
      ))}
      </AnimatePresence>
    </Box>
  );
};

export default FundUpdatesList;