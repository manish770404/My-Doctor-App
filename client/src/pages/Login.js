import React, { useState } from 'react';
import "../styles/RegisterStyle.css";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, message, Checkbox } from 'antd';
import axios from 'axios';

// You would need to import these icons from a library like 'react-icons' or similar
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // form handler
  const onfinishHandler = async (values) => {
    try {
      setLoading(true);
      dispatch(showLoading());
      
      const res = await axios.post('/api/v1/user/login', values);
      
      dispatch(hideLoading());
      setLoading(false);
      
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
  
        message.success('Login successful! Redirecting...');
  
        // Wait for token to set
        setTimeout(() => {
          if (res.data.user?.isAdmin) {
            navigate("/admin/dashboard");  // Redirect to admin panel
          } else {
            navigate("/");  // Redirect to normal homepage
          }
          window.location.reload();
        }, 1000);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      setLoading(false);
      console.log(error);
      message.error('Something went wrong. Please try again.');
    }
  };
  

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onfinishHandler} className="register-form">
          <div className="form-header">
            <div className="form-logo">A</div>
            <h3>Welcome Back</h3>
            <p className="form-subtitle">Sign in to continue to your account</p>
          </div>
          
          <Form.Item 
            label="Email" 
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <div className="input-icon-wrapper">
              <span className="input-icon">
                {/* <FaEnvelope /> */}
                📧
              </span>
              <Input type="email" placeholder="Enter your email" />
            </div>
          </Form.Item>
          
          <Form.Item 
            label="Password" 
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <div className="password-input-wrapper">
              <span className="input-icon">
                {/* <FaLock /> */}
                🔒
              </span>
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
              />
              <span 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </Form.Item>
          
          <div className="remember-me">
            <div className="checkbox-container">
              <Checkbox>Remember me</Checkbox>
            </div>
            <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
          </div>
          
          <button className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          
          <div className="form-divider">or continue with</div>
          
          <div className="social-logins">
            <button type="button" className="social-btn">
              {/* <FaGoogle /> */}
              G
            </button>
            <button type="button" className="social-btn">
              {/* <FaApple /> */}
              A
            </button>
            <button type="button" className="social-btn">
              {/* <FaFacebook /> */}
              F
            </button>
          </div>
          
          <div className="form-footer">
            <span>Don't have an account?</span>
            <Link to="/register"> Create an account</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;