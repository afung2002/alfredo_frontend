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


