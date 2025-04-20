import { SxProps, Theme } from "@mui/material";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const noDataMessageStyles: SxProps<Theme> = {
  textAlign: "center",
  mt: 4,
  color: "text.secondary",
};

export const formContainerStyles: SxProps<Theme> = {
  maxWidth: 800,
  mx: "auto",
  p: 3,
  textAlign: "left",
};

export const formFieldStyles: SxProps<Theme> = {
  mb: 3,
};

export const submitButtonStyles: SxProps<Theme> = {
  mt: 3,
  bgcolor: "black",
  color: "white",
  "&:hover": {
    bgcolor: "rgba(0, 0, 0, 0.8)",
  },
};

export const cancelButtonStyles: SxProps<Theme> = {
  mt: 3,
  mr: 2,
  borderColor: "rgba(0, 0, 0, 0.2)",
  color: "text.primary",
  "&:hover": {
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
};

export const headerStyles: SxProps<Theme> = {
  mb: 3,
  fontWeight: 500,
};

export const cardStyles: SxProps<Theme> = {
  p: 2,
  mb: 2,
  borderRadius: 1,
  border: "1px solid",
  borderColor: "rgba(0, 0, 0, 0.1)",
  "&:hover": {
    borderColor: "rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
  },
};

export const loadingContainerStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "60vh",
};

export const errorContainerStyles: SxProps<Theme> = {
  p: 3,
};

export const searchByTitle = (
  cards: any[] | undefined,
  searchTerm: string,
  searchBy: string
): any[] | undefined => {
  if (!searchTerm.trim()) return cards;
  if (searchBy === "company")
    return cards?.filter((card) =>
      card.company.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

  return cards?.filter((card) =>
    card[searchBy].toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
};
