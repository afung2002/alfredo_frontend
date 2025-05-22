import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    // <div className="flex items-center justify-center h-screen">
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <CircularProgress
        size={50}
      />
    </div>
  );
};

export default Loader;