import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './router';
import { lightTheme, darkTheme } from './theme';
import { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AppProvider } from './context/appContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Can toggle or use system preference

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);
  console.log(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  console.log(import.meta.env.VITE_ENV_NAME);
  return (

    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
