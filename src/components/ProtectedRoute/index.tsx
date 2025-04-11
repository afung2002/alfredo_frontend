import { useUser } from '@clerk/clerk-react';
import Loader from '../Loader';
import { Navigate } from 'react-router-dom';
import { Routes } from '@constants/routes';
import { useAuth } from '@clerk/clerk-react';
type ProtectedRouteProps = {
  children: React.ReactNode;
};
const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  getToken().then((token) => {
    console.log('Token:', token);
  })
  console.log(useUser())
  if (!isLoaded) {
    return <Loader />;
  }
  if (isLoaded && !isSignedIn) {
    return <Navigate to={Routes.LANDING} replace />;
  }


  return (<>{children}</>)
}

export default ProtectedRoute