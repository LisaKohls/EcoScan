import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axiosAPI';
import { AxiosError } from 'axios';

const LOGIN_URL = 'api/auth/login';
const LoginPage: React.FC = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken ?? '';
      setAuth({ username, accessToken });
      setUsername('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (err) {
      const error = err as AxiosError; // TODO: Check if it is axios Error...

      if (!error?.response) {
        setErrMsg('No Server Response');
      } else {
        if (error.response?.status === 400) {
          setErrMsg('Missing Username or Password');
        } else {
          if (error.response?.status === 401) {
            setErrMsg('Unauthorized');
          } else {
            setErrMsg('Login Failed');
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log(errMsg);
    // TODO: Display the error Msg visible for the user
  }, [errMsg]);

  return (
    <div className="min-h-screen bg-secondary-color flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link
              to="/registration"
              className="inline-block align-baseline font-bold text-sm text-primary-color hover:text-secondary-color"
            >
              Create new account!
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          ©2023 EcoScan. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
