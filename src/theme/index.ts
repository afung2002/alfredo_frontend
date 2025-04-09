// theme.js
import { createTheme } from '@mui/material/styles';

// const rubik = Rubik({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700', '800', '900'],
//   display: 'swap',
// });

export const lightTheme = createTheme({
  // typography: { fontFamily: `${rubik.style.fontFamily}, sans-serif` },
  palette: {
    mode: 'light',
    primary: {
      main: '#64B5F6', // Same as dark theme for brand consistency
      light: '#9BE7FF',
      dark: '#2286C3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#5C6BC0', // Same as dark theme for brand consistency
      light: '#8E99F3',
      dark: '#26418F',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F4F8FE', // Subtle bluish backdrop, not pure white
      paper: '#FFFFFF', // Standard white paper surface
    },
    text: {
      primary: '#1A2236', // Darker text for readability
      secondary: '#4B5563', // Softer gray-blue for less emphasis
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    error: {
      main: '#EF5350',
      light: '#FF867C',
      dark: '#C62828',
      contrastText: '#fff',
    },
    warning: {
      main: '#FFCA28',
      light: '#FFD95B',
      dark: '#FFA000',
      contrastText: '#000',
    },
    info: {
      main: '#29B6F6',
      light: '#4FC3F7',
      dark: '#0288D1',
      contrastText: '#000',
    },
    success: {
      main: '#66BB6A',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#000',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundColor: '#F4F8FE' },
        outlined: { backgroundColor: '#ffffff' },
        elevation: { backgroundColor: '#F4F8FE' },
      },
    },
    // MuiSvgIcon: {
    //   styleOverrides: {
    //     root: {
    //       color: '#64B5F6',
    //     },
    //     OwnersList
    //   },
    // },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && { color: '#64B5F6' }),
          ...(ownerState.color === 'secondary' && { color: '#5C6BC0' }),
          ...(ownerState.color === 'error' && { color: '#EF5350' }),
          ...(ownerState.color === 'warning' && { color: '#FFCA28' }),
          ...(ownerState.color === 'info' && { color: '#29B6F6' }),
          ...(ownerState.color === 'success' && { color: '#66BB6A' }),
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#E3F2FD',
          color: '#1A2236',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { backgroundColor: '#E3F2FD', // Light theme background
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  // typography: { fontFamily: `${rubik.style.fontFamily}, sans-serif` },
  palette: {
    mode: 'dark',
    primary: {
      main: '#64B5F6', // Soft bright blue
      light: '#9BE7FF',
      dark: '#2286C3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#5C6BC0', // Deeper, slightly purple-blue accent
      light: '#8E99F3',
      dark: '#26418F',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#1A2236', // A dark navy-like background
      paper: '#212A3E', // Slightly lighter for elevated surfaces
    },
    text: {
      primary: '#E3F2FD', // Light bluish text
      secondary: '#B0BEC5', // Softer grayish-blue for subdued text
      disabled: 'rgba(227, 242, 253, 0.38)',
    },
    error: {
      main: '#EF5350',
      light: '#FF867C',
      dark: '#C62828',
      contrastText: '#fff',
    },
    warning: {
      main: '#FFCA28',
      light: '#FFD95B',
      dark: '#FFA000',
      contrastText: '#000',
    },
    info: {
      main: '#29B6F6',
      light: '#4FC3F7',
      dark: '#0288D1',
      contrastText: '#000',
    },
    success: {
      main: '#66BB6A',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#000',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundColor: '#212A3E' },
        outlined: { backgroundColor: '#212A3E' },
        elevation: { backgroundColor: '#2C3548' },
      },
    },
    // MuiSvgIcon: {
    //   styleOverrides: {
    //     root: {
    //       color: '#64B5F6',
    //     },
    //   },
    // },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && { color: '#64B5F6' }),
          ...(ownerState.color === 'secondary' && { color: '#5C6BC0' }),
          ...(ownerState.color === 'error' && { color: '#EF5350' }),
          ...(ownerState.color === 'warning' && { color: '#FFCA28' }),
          ...(ownerState.color === 'info' && { color: '#29B6F6' }),
          ...(ownerState.color === 'success' && { color: '#66BB6A' }),
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A2236',
          color: '#E3F2FD',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { backgroundColor: '#1A2236', // Light theme background
        },
      },
    },

  },
});
