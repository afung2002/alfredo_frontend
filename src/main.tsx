import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react';
import { persistor, store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './theme';
const mode = 'light'
const clerkPubKey = import.meta.env.VITE_CLERK_KEY;
createRoot(document.getElementById('root')!).render(

    <ClerkProvider publishableKey={clerkPubKey}>
        <Provider store={store}>
        <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
            </ThemeProvider>
        </Provider>
    </ClerkProvider>
)
