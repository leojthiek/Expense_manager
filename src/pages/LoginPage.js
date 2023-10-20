import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email,setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
    const navigate = useNavigate()

    const handleClick = () => {
      if(email && password !== ""){
        navigate('/view/expenses')
      }
    }
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
      <div className="w-1/3 h-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Login Page</h1>
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="h-12 px-3 py-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="h-12 px-3 py-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleClick} className="bg-blue-500 text-white text-sm font-semibold h-12 rounded hover:bg-blue-600 transition-colors duration-300">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
