import { getMeFn } from 'src/api/baseApi';
import { useAuthState } from 'src/context/auth.context';

import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { validatePath } from 'src/helpers/utils';

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const userProvider = useAuthState();
  const { authState, dispatch } = userProvider;

  const location = useLocation()
  const navigate = useNavigate()

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    // console.log('AuthMiddleware: fetch start');
    let isMounted = true;

    ; (async () => {
      try {
        const user = await getMeFn({ client: 'auth' });
        console.log('AuthMiddleware: fetch success', user);

        if (user.success) {
          dispatch({ type: 'SET_USER', payload: user.data });
        }

        if (!isMounted) {
          console.debug('AuthMiddleware:Aborted setState on unmounted component')
        } else {
          setIsFetching(false);
        };
      } catch (err) {
        console.error('AuthMiddleware Err:', err);
        setIsFetching(false);

        console.log(validatePath([{ path: 'login' }]));

        if (!validatePath([{ path: 'login' }]).length) {
          navigate('login')
        }
      }
    })();

    return () => { isMounted = false; };
  }, [dispatch])

  if (isFetching) {
    return <>Loading...</>
  }

  return children;
};

export default AuthMiddleware;
