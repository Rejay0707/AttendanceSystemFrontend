// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import LoginForm from '../component/LoginForm.js';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LoginContainer = ({ setIsAuthenticated, setRole }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', formData);
//       const role = res.data?.user?.role;
  
//       toast.success('Login successful!');
//       setIsAuthenticated(true);
//       // Store token or role if needed
//       localStorage.setItem('role', role); // optional
//       // localStorage.setItem('token', res.data.token); // if using token
//       setRole(role);
  
//       // Navigate based on role
//       setTimeout(() => {
//         if (role === 'admin') navigate('/admin');
//         else if (role === 'teacher') navigate('/teacher');
//         else if (role === 'student') navigate('/student');
//         else toast.error('Unknown role');
//       }, 1000);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed!');
//     }
//   };
  
  

//   return (
//     <>
//       <LoginForm
//         formData={formData}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//       />
//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// };

// export default LoginContainer;


import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../component/LoginForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginContainer = ({ setIsAuthenticated, setRole }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const role = res.data?.user?.role;

      toast.success('Login successful!');
      setIsAuthenticated(true);
      setRole(role);
      localStorage.setItem('role', role);

      setTimeout(() => {
        if (role === 'admin') navigate('/admin');
        else if (role === 'teacher') navigate('/teacher');
        else if (role === 'student') navigate('/student');
        else toast.error('Unknown role');
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <>
      <LoginForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default LoginContainer;
