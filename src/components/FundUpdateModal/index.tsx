import React from "react";
import { Modal, Box, Typography, Dialog } from "@mui/material";
import Button from "@components/Button";
import Input from "@components/Input";
import TextEditor from "@components/TextEditor";

type FundUpdateModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  control: any;
  setValue: (field: string, value: string) => void;
  errors: {
    postTitle?: { message?: string };
    postDescription?: { message?: string };
  };
};

const FundUpdateModal: React.FC<FundUpdateModalProps> = ({
  open,
  onClose,
  onSubmit,
  control,
  errors,
  setValue
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="create-fund-update-modal"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          width: '600px'
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 3, color: "black" }}>
          Create Fund Update
        </Typography>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <Input
              name="postTitle"
              control={control}
              label="Title"
              rounded={false}
              error={!!errors?.postTitle?.message}
            />
          </div>

          <TextEditor onEditorChange={(value: string) => setValue("postDescription", value)} />
          <Box
            className="mt-4 gap-2"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          > 
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Post</Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default FundUpdateModal;
