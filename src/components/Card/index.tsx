import { Card as MuiCard, CardProps, CardHeader, CardActions, Chip, CardContent, IconButton, Menu, MenuItem } from "@mui/material";
import Button from "../Button";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
type CardPropsType = CardProps & {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  title?: string;
  subtitle?: string;
  actions?: any[];
  tags?: {
    label: string;
    color?: "default" | "primary" | "secondary" | "error" | "success" | "warning" | "info";
    onClick?: () => void;
  }[];
}
const Card = ({ children, onClick, className, title, subtitle, actions, tags }: CardPropsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuItemClick = () => {
    // Handle menu item click here
    setAnchorEl(null);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleMoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('More menu clicked');
    event.stopPropagation(); // Prevent the card click event from firing
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <MuiCard className={`p-2 ${className}`} onClick={onClick}>
        <CardHeader
          title={title}
          subheader={subtitle}
          action={
            <IconButton onClick={handleMoreMenuClick}>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent>
          {children}
        </CardContent>
        <CardActions className="flex justify-between items-center">
          <div>
            {
              tags?.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.label}
                  color={tag.color}
                  variant="outlined"
                  sx={{ mr: '12px' }}
                  onClick={tag.onClick}
                />
              ))
            }
          </div>
          <div>
            {
              actions?.map((action, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  onClick={() => action.onClick()}
                  size="small">
                  {action.label}
                </Button>
              ))
            }
          </div>
        </CardActions>
      </MuiCard>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuItemClick}>
        <DeleteOutlineIcon />
        Remove</MenuItem>
      </Menu>
    </>

  )
}

export default Card;