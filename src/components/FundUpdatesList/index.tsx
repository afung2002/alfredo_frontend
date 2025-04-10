import { CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { FundUpdate } from "../../types";
import UpdateCard from "@components/UpdateCard";
import { Field, Form } from "formik";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { createFundUpdate } from "@services/index";
import Button from "../Button";
import Input from "../Input";
import { useForm } from "react-hook-form";




const validationSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const FundUpdatesList = ({ updates }: any) => {
  const { control } = useForm({
    defaultValues: {
      description: "",
      title: "",
    },
  });
  const [open, setOpen] = useState(false);
  // const [updates, setUpdates] = useState<FundUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fundId } = useParams<{ fundId: string }>();

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (updates.length > 0) {
      setLoading(false);
    }
  }, [updates]);
  //     if (!fundId) {
  //       setError("Fund ID is required");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const data = await getFundFundUpdates(fundId);
  //       setUpdates(data);
  //       setError(null);
  //     } catch (err) {
  //       setError("Failed to fetch limited partners. Please try again.");
  //       console.error("Error fetching limited partners:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // useEffect(() => {
  //       fetchUpdates();
  // }, [fundId]);

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