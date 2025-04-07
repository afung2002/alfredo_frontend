import { RedirectToSignIn, useUser } from '@clerk/clerk-react';
import Loader from '../Loader';
import { Navigate, Route } from 'react-router-dom';
import { Routes } from '../../constants/routes';
type ProtectedRouteProps = {
  children: React.ReactNode;
};
const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn } = useUser();
  console.log('isLoaded', isLoaded);
  console.log('isSignedIn', isSignedIn);
  
  if (!isLoaded) {
    return <Loader />;
  }
  if (isLoaded && !isSignedIn) {
    return <Navigate to="/" replace />;
    // return <RedirectToSignIn />;
  }

  return (<>{children}</>)
}

export default ProtectedRoute