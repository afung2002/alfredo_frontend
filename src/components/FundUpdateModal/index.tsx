import React from "react";
import { Modal, Box, Typography, Dialog } from "@mui/material";
import Button from "@components/Button";
import Input from "@components/Input";
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
type FundUpdateModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  control: any;
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

          {/* <Input
            name="postDescription"
            control={control}
            label="Message"
            multiline
            rows={5}
            rounded={false}
            error={!!errors?.postDescription?.message}
          /> */}
        <EditorProvider />
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
