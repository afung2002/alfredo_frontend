import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "../Button";

type FeedbackModalProps = {
  isFeedback: { open: boolean, name: string, email: string };
  setIsFeedback: (isFeedbackOpen: { open: boolean, name: string, email: string }) => void;
  title: string;
  children: React.ReactNode;
  buttonText: string;
}

const FeedbackModal = ({ isFeedback, setIsFeedback, title, children, buttonText }: FeedbackModalProps) => {
  return (
    <Dialog open={isFeedback.open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsFeedback({
          open: false,
          name: '',
          email: '',
        })}>{buttonText}</Button>
      </DialogActions>
    </Dialog>
  )
};

export default FeedbackModal;


