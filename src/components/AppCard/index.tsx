import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface AppCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  path: string;
  onAdd?: () => void;
}

const AppCard: React.FC<AppCardProps> = ({
  title,
  description,
  imageUrl,
  category,
  path,
  onAdd,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (event: React.MouseEvent) => {
    // Prevent navigation if clicking the add button
    if ((event.target as HTMLElement).closest('.MuiIconButton-root')) {
      return;
    }
    navigate(path);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          width: 120,
          height: '100%',
          flexShrink: 0,
          backgroundColor: 'grey.100',
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          py: 2,
          px: 3,
          '&:last-child': { pb: 2 },
        }}
      >
        {/* Text Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 700, 
              mb: 0.3,
              width: '100%',
              textAlign: 'left'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary"
            sx={{
              width: '100%',
              textAlign: 'left'
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Category and Add Button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexShrink: 0,
          }}
        >
          <Chip
            label={category}
            size="small"
            sx={{
              backgroundColor: 'grey.100',
              borderRadius: '5px',
              color: 'primary.main',
            }}
          />
          <IconButton
            className="MuiIconButton-root"
            onClick={onAdd}
            sx={{
              color: 'primary.main',
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AppCard; 