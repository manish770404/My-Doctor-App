import React, { useState } from 'react';
import "../styles/RegisterStyle.css"; // Using the same enhanced CSS from login
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Form, Input, message, Checkbox } from 'antd';

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const onfinishHandler = async(values) => {
    try {
      setLoading(true);
      dispatch(showLoading());
      
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/register`, values);

      
      dispatch(hideLoading());
      setLoading(false);
      
      if (res.data.success) {
        message.success('Registration successful!');
        
        // Small delay before redirect for better UX
        setTimeout(() => {
          navigate('/login');
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
            <h3>Create Account</h3>
            <p className="form-subtitle">Sign up to get started</p>
          </div>
          
          <Form.Item 
            label="Full Name" 
            name="name"
            rules={[
              { required: true, message: 'Please enter your name' },
              { min: 3, message: 'Name must be at least 3 characters' }
            ]}
          >
            <div className="input-icon-wrapper">
              <span className="input-icon">
                👤
              </span>
              <Input type="text" placeholder="Enter your full name" />
            </div>
          </Form.Item>
          
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
                📧
              </span>
              <Input type="email" placeholder="Enter your email" />
            </div>
          </Form.Item>
          
          <Form.Item 
            label="Password" 
            name="password"
            rules={[
              { required: true, message: 'Please enter a password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <div className="password-input-wrapper">
              <span className="input-icon">
                🔒
              </span>
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create a strong password"
                onChange={(e) => checkPasswordStrength(e.target.value)}
              />
              <span 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </Form.Item>
          
          {/* Password strength indicator */}
          <div className="password-strength">
            <div 
              className={`password-strength-bar ${
                passwordStrength === 1 ? 'strength-weak' : 
                passwordStrength === 2 ? 'strength-medium' : 
                passwordStrength === 3 ? 'strength-strong' : ''
              }`}
            ></div>
          </div>
          <div className="strength-text" style={{ 
            fontSize: '12px', 
            color: '#64748b',
            marginTop: '4px',
            marginBottom: '15px'
          }}>
            {passwordStrength === 0 ? 'Password strength' : 
             passwordStrength === 1 ? 'Weak - Add uppercase letters' : 
             passwordStrength === 2 ? 'Medium - Add numbers or symbols' : 
             'Strong password'}
          </div>
          
          <div className="terms-checkbox" style={{ marginBottom: '20px' }}>
            <Checkbox>I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></Checkbox>
          </div>
          
          <button className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <div className="form-divider">or sign up with</div>
          
          <div className="social-logins">
            <button type="button" className="social-btn">
              G
            </button>
            <button type="button" className="social-btn">
              A
            </button>
            <button type="button" className="social-btn">
              F
            </button>
          </div>
          
          <div className="form-footer">
            <span>Already have an account?</span>
            <Link to="/login"> Sign in</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Registration;