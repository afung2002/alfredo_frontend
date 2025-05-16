import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "../Button";

type FeedbackModalProps = {
  setIsFeedbackModalOpen: (open: boolean) => void;
  open: boolean;
  title: string;
  children: React.ReactNode;
  buttonText: string;
}

const FeedbackModal = ({ open, setIsFeedbackModalOpen, title, children, buttonText }: FeedbackModalProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={() => setIsFeedbackModalOpen(false)}>{buttonText}</Button>
      </DialogActions>
    </Dialog>
  )
};

export default FeedbackModal;

// import { Snackbar, Alert, IconButton } from "@mui/material";
// import Button from "../Button";
// import React from "react";
// import CloseIcon from '@mui/icons-material/Close';

// type FeedbackSnackbarProps = {
//   open: boolean;
//   setIsFeedbackModalOpen: (open: boolean) => void;
//   title: string;
//   children?: React.ReactNode;
//   buttonText?: string;
//   severity?: "success" | "info" | "warning" | "error";
//   position?: "top" | "bottom";
// };

// const FeedbackModal = ({
//   position = "top",
//   open,
//   setIsFeedbackModalOpen,
//   title,
//   children,
//   buttonText = "Close",
//   severity = "info",
// }: FeedbackSnackbarProps) => {
//   return (
//     <Snackbar
//       anchorOrigin={{ vertical: position, horizontal: "center" }}
//       open={open}
//       autoHideDuration={6000}
//       onClose={() => setIsFeedbackModalOpen(false)}
//     >
//       <Alert
//         severity={severity}
//         onClose={() => setIsFeedbackModalOpen(false)}
//         action={
//           buttonText && (
//             <IconButton onClick={() => setIsFeedbackModalOpen(false)}>
//               <CloseIcon />
//             </IconButton>
//           )
//         }
//         sx={{ width: "100%" }}
//       >
//         <strong>{title}</strong>
//         {children && <div>{children}</div>}
//       </Alert>
//     </Snackbar>
//   );
// };

// export default FeedbackModal;


