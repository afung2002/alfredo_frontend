import { Card as MuiCard, CardProps, CardHeader, CardActions, Chip, CardContent, IconButton, Menu, MenuItem, CardMedia, Typography } from "@mui/material";
import Button from "../Button";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import { on } from "events";
type CardPropsType = CardProps & {
  children?: React.ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
  className?: string;
  title?: React.ReactNode | React.ReactElement;
  subtitle?: string | React.ReactNode;
  actions?: any[];
  avatar?: React.ReactNode;
  sideImage?: string;
  orientation?: "row" | "grid";
  tags?: {
    label: string | React.ReactNode;
    color?: "default" | "primary" | "secondary" | "error" | "success" | "warning" | "info";
    onClick?: () => void;
  }[];
}
const Card = ({ children, onClick, className, title, subtitle, actions, tags, onDelete, onDownload, avatar, sideImage, orientation = 'row' }: CardPropsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleDownloadClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent card click
    onDownload?.();
    setAnchorEl(null);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent card click
    onDelete?.();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent the card click event from firing
    setAnchorEl(event.currentTarget);
  };
  console.log(onDelete)
  return (
    <>
      <MuiCard variant="outlined" sx={{ borderRadius: '8px' }} className={`flex !border-none ${orientation === 'grid' ? 'flex-col' : ''} ${className}`} onClick={onClick}>
        {
          sideImage && (
            <div className={` bg-slate-200 flex justify-center items-center ${orientation === 'grid' ? 'h-32 w-full' : 'h-auto w-1/3'}`}>
              <img src={sideImage} alt="sideImage" className={`${orientation === 'grid' ? 'w-1/2 h-2/3' : 'w-1/2 h-full'}`} />
            </div>
          )
        }
        <div className="flex flex-col w-full h-full justify-between p-2">
          <CardHeader
            avatar={
              avatar && avatar
            }
            title={
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical',
                }}
              >{title}</span>

            }
            subheader={
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '1',
                  WebkitBoxOrient: 'vertical',
                }}
              >{subtitle}</span>
            }
            action={
              onDelete || onDownload ?
                (<IconButton onClick={handleMoreMenuClick}>
                  <MoreVertIcon />
                </IconButton>)
                : null
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
        </div>

      </MuiCard>
      {
        (onDelete || onDownload) && (
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
            {
              onDownload && (
                <MenuItem onClick={handleDownloadClick}>
                  <DownloadIcon />
                  Download
                </MenuItem>
              )
            }
            {
              onDelete && (
                <MenuItem onClick={handleDeleteClick}>
                  <DeleteOutlineIcon />
                  Delete
                </MenuItem>
              )
            }

          </Menu>
        )
      }
    </>

  )
}

export default Card;