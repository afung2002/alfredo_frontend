import { Box, Button, Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { FundUpdate } from "../../types/index";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useRef, useEffect } from "react";

interface UpdateListCardProps {
  update: FundUpdate;
}

const UpdateCard: React.FC<UpdateListCardProps> = ({ update }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(descriptionRef.current).lineHeight
      );
      const height = descriptionRef.current.scrollHeight;
      setShowReadMore(height > lineHeight * 3);
    }
  }, [update.description]);

  const handleCardClick = () => {
    console.log("Card clicked");
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Paper
      variant="outlined"
      onClick={handleCardClick}
      className="transition-shadow duration-200 flex flex-col"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: '24px',
        borderRadius: '6px',
        cursor: "pointer",
        mb: '8px',
        backgroundColor: 'grey.100',
        ':hover': {
          backgroundColor: '#f5f5f5',
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "100%",

        }}
      >
        {/* <Typography variant="subtitle1" sx={{ fontWeight: 500, flex: 1 }}>
            {update.}
          </Typography> */}
        <Typography variant="body2">{update.title}</Typography>
        <FiberManualRecordIcon sx={{ fontSize: 8, color: "black" }} />
        <Typography variant="body2" color="text.secondary">
          {new Date(update.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
                
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <Typography
          ref={descriptionRef}
          align="left"
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: isExpanded ? "none" : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {update.message}
        </Typography>
        {showReadMore && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 0 }}>
            <Button
              onClick={handleReadMoreClick}
              endIcon={
                isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              }
              sx={{
                color: "text.secondary",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {isExpanded ? "Close" : "Read more"}
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default UpdateCard;