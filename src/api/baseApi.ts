import axios from 'axios';
import { getItem, setItem } from 'src/helpers/utils';
import { GenericResponse, ILoginResponse, ILoginRequest, IRegisterRequest, IUserData } from './types/auth';
import notification from 'src/helpers/notification';

const BASE_URL_AUTH = `${process.env.REACT_APP_AUTH_ENDPOINT}/`;
const BASE_URL_USER = `${process.env.REACT_APP_USER_ENDPOINT}/`;

export const baseApi = axios.create({
  // baseURL: BASE_URL_AUTH,
  withCredentials: true,
});

baseApi.defaults.headers.common['Content-Type'] = 'application/json';

// Request interceptor for API calls
baseApi.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
    'Authorization': `Bearer ${getItem('accessToken')}`,
    // 'RefreshToken': getItem('refreshToken') as string,
  }

  return config;
});

// Response interceptor for API calls
baseApi.interceptors.response.use(
  (response) => {
    if (response.data.error) {
      throw new Error(response.data.error)
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    notification.onError(error)

    // const errMessage = error.response.data?.message || error.message;

    // RefreshAccessToken
    // if (getItem('loggedIn') === 'true' && error.response.status === 401 && !originalRequest._retry) {
    //   console.log('Refetch AccessToken!');

    //   originalRequest._retry = true;
    //   const data = await refreshAccessTokenFn();

    //   if (data.accessToken) {
    //     console.log('Renewed AccessToken!');
    //     setItem('accessToken', data.accessToken)
    //     return baseApi(originalRequest);
    //   }
    // }

    // if (getItem('loggedIn') === 'true' && error.response.status === 403 && errMessage.includes('not refresh')) {
    //   console.error('Force reauthorization!');
    //   setItem('loggedIn', "false")
    // }

    return Promise.reject(error);
  }
);

export const signUpUserFn = async (user: IRegisterRequest) => {
  const response = await baseApi.post<GenericResponse>(BASE_URL_AUTH + 'auth/register', user);
  return response.data;
};

export const signInUserFn = async (user: ILoginRequest) => {
  const response = await baseApi.post<ILoginResponse>(BASE_URL_AUTH + 'auth/login', user);
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await baseApi.get<GenericResponse>(BASE_URL_USER + 'auth/logout');
  return response.data;
};

export const getMeFn = async (params?: { client?: string | ''; }) => {
  const response = await baseApi.get<{ success: boolean, data: IUserData }>(BASE_URL_USER + 'users/me?client=' + (params?.client || ''));
  return response.data;
};