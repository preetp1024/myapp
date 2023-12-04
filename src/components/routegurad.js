import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '../store';
import { getToken } from '../lib/authenticate';

const PUBLIC_PATHS = ['/login', '/register'];

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  useEffect(() => {
    const token = getToken();

    if (!token && !PUBLIC_PATHS.includes(router.pathname)) {
      router.push('/login');
    } else if (token && PUBLIC_PATHS.includes(router.pathname)) {
      router.push('/favourites'); // Redirect authenticated users away from login/register pages
    } else {
      setIsAuthenticated(!!token);
    }
  }, []);

  return children;
};

export default RouteGuard;
