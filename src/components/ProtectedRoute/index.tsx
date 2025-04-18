import { useUser } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../Loader';
import { Routes } from '@constants/routes';
import { useDispatch } from 'react-redux';
import { setToken } from '@redux/slices/configs';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [token, setTokenState] = useState<string | null>(null);
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      getToken({ template: 'dev_only_token' })
        .then((token) => {
          setTokenState(token);
          dispatch(setToken(token)); // Set the token in Redux store
        })
        .catch((error) => {
          console.error('Failed to get token:', error);
        });
    }
  }, [isLoaded, isSignedIn, getToken, dispatch]);

  if (!isLoaded || token === null) {
    return <Loader />;
  }

  if (!isSignedIn || token === null) {
    return <Navigate to={Routes.LANDING} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
