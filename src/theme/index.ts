import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f2f0f5',
      paper: '#ffffff',
    },
    primary: {
      main: '#8375a9',
      light: '#e9e5f4',
      dark: '#6a5b8e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#b27b44',
      light: '#f3e8dc',
      dark: '#9a693a',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#1f1f1f',
      secondary: '#4e4e4e',
      disabled: '#8a8a8a',
    },
    divider: '#dcdbe4',
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#2196f3',
    },
  },
  typography: {
    fontFamily: `'DM Sans', sans-serif`,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f2f0f5',
        },
      },
    },

    // ✅ ListItem selected background color
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#e7e4e4',
            '&:hover': {
              backgroundColor: '#dcdada',
            },
          },
        },
      },
    },

    // ✅ Tabs - inactive tab background color
    MuiTab: {
      styleOverrides: {
        root: {
          '&.MuiTab-root:not(.Mui-selected)': {
            backgroundColor: '#e7e4e4',
          },
        },
      },
    },
  },
});

export default theme;
