import { Typography } from "@mui/material";
import { FundUpdate } from "../../types/index";
import { useState, useRef, useEffect } from "react";
import Card from "../Card";
import { useFormattedTime } from "@hooks/useFormattedTime";
import { useDeleteFundUpdateMutation } from "../../services/api/baseApi";
import UpdateIcon from "@assets/update.svg";
import { useAppContext } from "../../context/appContext";
import { Apps } from "../../constants/apps";
interface UpdateListCardProps {
  update: FundUpdate;
}

const UpdateCard: React.FC<UpdateListCardProps> = ({ update }) => {
  const [deleteUpdate, { isLoading: isDeleting }] = useDeleteFundUpdateMutation();
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };
  const formattedUpdatedAt = useFormattedTime(update?.updated_at)
  const { app } = useAppContext();
  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(descriptionRef.current).lineHeight
      );
      const height = descriptionRef.current.scrollHeight;
      setShowReadMore(height > lineHeight * 3);
    }
  }, [update.description]);
  const handleUpdateDelete = (id: number) => {
    deleteUpdate(id)
      .unwrap()
  }
  return (
    <div className="mb-4">
      <Card
        onDelete={app === Apps.LIMITED_PARTNER ? undefined : () => handleUpdateDelete(update.id)}
        title={update.title}
        subtitle={<Typography variant="subtitle2">{formattedUpdatedAt}</Typography>}
        className="transition-shadow duration-200"
        sideImage={UpdateIcon}
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
            <div
              ref={descriptionRef}
              style={{
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
                maxHeight: isCollapsed ? '4.5em' : 'fit-content', // 3 lines * line-height ~1.5em
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: isCollapsed ? '3' : 'unset',
              }}
            >
              <Typography 
                dangerouslySetInnerHTML={{ __html: update.description }}
                variant="body1" sx={{ color: "text.secondary", whiteSpace: 'pre-line' }} />
                
            </div>

            {showReadMore && (
              <Typography
                variant="body2"
                sx={{ color: 'primary.main', mt: 1, cursor: 'pointer', fontWeight: 500 }}
                onClick={toggleCollapse}
              >
                {isCollapsed ? 'Read more' : 'Show less'}
              </Typography>
            )}
          </div>
        )}

      </Card>
    </div>


  );
};

export default UpdateCard;