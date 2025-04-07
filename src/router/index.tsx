import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import Loader from '../components/Loader';

export default function AppRoutes() {
  const renderedRoutes = useRoutes(routes);
  return (
    <Suspense fallback={<Loader />}>
      {renderedRoutes}
    </Suspense>
  );
}