import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import { FundUpdate } from "../../types";
import UpdateCard from "@components/UpdateCard";

import { useEffect, useState } from "react";


const FundUpdatesList = ({ updates }: any) => {

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (updates.length > 0) {
      setLoading(false);
    }
  }, [updates]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }


  return (
    <Box sx={{ gap: 1 }}>
      {updates.map((update: FundUpdate) => (
        <UpdateCard key={update.id} update={update} />
      ))}
    </Box>
  );
};

export default FundUpdatesList;