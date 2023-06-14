import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axiosAPI';

interface UserType {
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

const REGISTER_URL = 'api/auth/register';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!email || !username || !password) {
      setIsFormValid(false);
      setErrMsg('Please fill in all fields');
      return;
    } else if (!emailRegex.test(email)) {
      setIsFormValid(false);
      setErrMsg('Please enter a valid email address');
      return;
    }

    const userData: UserType = {
      username,
      password,
      email,
      firstName: 'John',
      lastName: 'Doe',
    };

    try {
      await axios.post(REGISTER_URL, userData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      navigate('/login');
    } catch (err) {
      const error = err as AxiosError;

      if (!error?.response) {
        setErrMsg('No server response');
      } else if (error.response?.status === 400) {
        setErrMsg('Missing required fields');
      } else if (error.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Registration Failed');
      }
    }
  };

  useEffect(() => {
    console.log(errMsg);
  }, [errMsg]);

  return (
    <div className="min-h-screen bg-secondary-color flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                submitted && (!email || !emailRegex.test(email)) && 'border-red-500'
              }`}
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSubmitted(false);
                setIsFormValid(true);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                submitted && !username && 'border-red-500'
              }`}
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setSubmitted(false);
                setIsFormValid(true);
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
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                submitted && !password && 'border-red-500'
              }`}
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setSubmitted(false);
                setIsFormValid(true);
              }}
            />
            {submitted && (
              <p className="text-red-500 text-xs italic mb-2">{errMsg}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          ©2023 EcoScan. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
