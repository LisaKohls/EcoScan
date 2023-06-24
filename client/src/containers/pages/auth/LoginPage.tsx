import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axiosAPI';
import { AxiosError } from 'axios';
import EcoScan from '../../../components/logos/EcoScan';
import LeaveLogo from '../../../components/logos/LeaveLogo';

const LOGIN_URL = 'api/auth/login';

const LoginPage: React.FC = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setSubmitted(true);

    if (!username && !password) {
      setIsFormValid(false);
      setErrMsg('Please enter a username and password');
      return;
    } else if (!username) {
      setIsFormValid(false);
      setErrMsg('Please enter a username');
      return;
    } else if (!password) {
      setIsFormValid(false);
      setErrMsg('Please enter a password');
      return;
    }

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
      const error = err as AxiosError;

      if (!error?.response) {
        setErrMsg('No server response');
      } else if (error.response?.status === 401) {
        setErrMsg('Invalid username or password');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  const handleInputChange = () => {
    setSubmitted(false);
    setIsFormValid(true);
  };

  /* 
  useEffect(() => {
    console.log(errMsg);
    // TODO: Display the error Msg visible for the user
  }, [errMsg]);
  */

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-secondary-light flex items-center justify-center">
      <div className="w-full max-w-xs">
        <LeaveLogo sizing="w-2/3 h-auto" />
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-300 rounded px-8 pt-6 pb-8 mb-4"
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
              className={` appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-primary-color ${
                submitted && !username && 'border-red-500'
              }`}
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
                handleInputChange();
              }}
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
              className={` appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-primary-color  ${
                submitted && !password && 'border-red-500'
              }`}
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                handleInputChange();
              }}
            />
            {submitted && (
              <p className="text-red-500 text-xs italic mb-2">{errMsg}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary-color hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
