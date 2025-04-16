import { Typography } from "@mui/material";
import { FundUpdate } from "../../types/index";
import { useState, useRef, useEffect } from "react";
import Card from "../Card";
import { useFormattedTime } from "@hooks/useFormattedTime";
interface UpdateListCardProps {
  update: FundUpdate;
}

const UpdateCard: React.FC<UpdateListCardProps> = ({ update }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const formattedCreatedAt = useFormattedTime(update?.created_at)
  const formattedUpdatedAt = useFormattedTime(update?.updated_at)
  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(descriptionRef.current).lineHeight
      );
      const height = descriptionRef.current.scrollHeight;
      setShowReadMore(height > lineHeight * 3);
    }
  }, [update.description]);

  return (
    <div className="mb-4">
      <Card
        title={update.title}
        subtitle={formattedUpdatedAt}
        className="transition-shadow duration-200"
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
        {update.description && (
          <div>
            <Typography variant="body2" sx={{
              color: "text.secondary",
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
            }}>
              {update.description}
            </Typography>
          </div>

        )}

      </Card>
    </div>


  );
};

export default UpdateCard;