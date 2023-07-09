import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axiosAPI';
import { AxiosError } from 'axios';
import EcoScan from '../../../components/logos/EcoScan';

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

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setSubmitted(true);

    if (!username && !password) {
      setErrMsg('Please enter a username and password');
      return;
    } else if (!username) {
      setErrMsg('Please enter a username');
      return;
    } else if (!password) {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary-light flex items-center justify-center">
      <div className="w-full max-w-xs">
        <EcoScan />
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
              className=" text-primary-color hover:text-white rounded-3xl border-2 border-primary-color hover:bg-primary-color p-3 transition ease-in-out duration-300"
              type="submit"
            >
              Sign In
            </button>
            <Link
              to="/registration"
              className="inline-block align-baseline font-bold text-sm text-primary-color hover:text-secondary-dark transition ease-in-out duration-300"
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
