import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react';
import { persistor, store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { UserProvider } from './context/userContext.tsx';


// const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkPubKey = 'pk_test_aW5ub2NlbnQtbW9sbHVzay0yLmNsZXJrLmFjY291bnRzLmRldiQ';
createRoot(document.getElementById('root')!).render(

    <ClerkProvider publishableKey={clerkPubKey}>
         <Provider store={store}>
             <PersistGate loading={null} persistor={persistor}>
                 <UserProvider>
                    <App />
                 </UserProvider>
             </PersistGate>
         </Provider>
    </ClerkProvider>
)
