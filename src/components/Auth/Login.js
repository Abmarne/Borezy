import React, { useState, useEffect } from 'react';
import { Button, Checkbox, TextField, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import Logo from '../../assets/logo.png';
import BgAbstract from '../../assets/sd.jpg';
import { fetchRealTimeDate } from '../../utils/fetchRealTimeDate';

const Login = () => {
  const { setUserData } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');
    
    if (savedEmail && savedPassword) {
      setEmail(JSON.parse(savedEmail));
      setPassword(JSON.parse(savedPassword));
      setRememberMe(true);
    }

    const checkAuthToken = async () => {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (token) {
        try {
          const auth = getAuth();
          const user = await auth.verifyIdToken(token);
          if (user) {
            setUserData({ name: user.name, role: user.role, email: user.email });
            navigate(user.role === 'Super Admin' ? '/branches' : '/welcome');
          }
        } catch (error) {
          console.error('Token validation error:', error);
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
        }
      }
    };
    checkAuthToken();
  }, [setUserData, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return false;
    }
    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      if (rememberMe) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', JSON.stringify(email));
        localStorage.setItem('userPassword', JSON.stringify(password));
      } else {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userEmail', JSON.stringify(email));
        sessionStorage.setItem('userPassword', JSON.stringify(password));
      }

      const superAdminQuery = query(collection(db, 'superadmins'), where('email', '==', email));
      const superAdminSnapshot = await getDocs(superAdminQuery);

      if (!superAdminSnapshot.empty) {
        const superAdminData = superAdminSnapshot.docs[0].data();
        setUserData({ name: superAdminData.name, role: 'Super Admin', email });
        toast.success('Welcome back, Super Admin!');
        navigate('/leads');
        return;
      }

      const branchQuery = query(collection(db, 'branches'), where('emailId', '==', email));
      const branchSnapshot = await getDocs(branchQuery);

      if (!branchSnapshot.empty) {
        const branchData = branchSnapshot.docs[0].data();
        const today = await fetchRealTimeDate();

        const branchActiveDate = new Date(branchData.activeDate);
        const branchDeactiveDate = new Date(branchData.deactiveDate);

        if (today < branchActiveDate) {
          toast.error('Branch plan not active.');
          setLoading(false);
          return;
        }

        if (today > branchDeactiveDate) {
          toast.error('Branch plan has expired.');
          setLoading(false);
          return;
        }

        if (branchData.firstLogin) {
          navigate('/change-password');
          return;
        }

        setUserData({
          name: branchData.ownerName,
          role: 'Branch Manager',
          email,
          branchCode: branchData.branchCode,
          branchName: branchData.branchName,
          numberOfUsers: branchData.numberOfUsers,
        });
        toast.success('Login successful!');
        navigate('/welcome');
        return;
      }

      const subuserQuery = query(collection(db, 'subusers'), where('email', '==', email));
      const subuserSnapshot = await getDocs(subuserQuery);

      if (!subuserSnapshot.empty) {
        const subuserData = subuserSnapshot.docs[0].data();

        if (!subuserData.isActive) {
          toast.error('Subuser account is inactive. Contact your branch owner.');
          setLoading(false);
          return;
        }

        const subuserActiveDate = new Date(subuserData.activeDate);
        const subuserDeactiveDate = new Date(subuserData.deactiveDate);

        if (today < subuserActiveDate) {
          toast.error('Subuser plan not active. Contact your branch owner.');
          setLoading(false);
          return;
        }

        if (today > subuserDeactiveDate) {
          toast.error('Subuser plan has expired. Contact your branch owner.');
          setLoading(false);
          return;
        }

        const branchRef = collection(db, 'branches');
        const branchQuery = query(branchRef, where('branchCode', '==', subuserData.branchCode));
        const branchSnapshot = await getDocs(branchQuery);

        if (!branchSnapshot.empty) {
          const branchData = branchSnapshot.docs[0].data();

          const branchActiveDate = new Date(branchData.activeDate);
          const branchDeactiveDate = new Date(branchData.deactiveDate);

          if (today < branchActiveDate) {
            toast.error('Branch plan not active. Contact your branch owner.');
            setLoading(false);
            return;
          }

          if (today > branchDeactiveDate) {
            toast.error('Branch plan has expired. Contact your branch owner.');
            setLoading(false);
            return;
          }

          setUserData({
            name: subuserData.name,
            role: 'Subuser',
            email,
            branchCode: subuserData.branchCode,
          });
          toast.success('Login successful!');
          navigate('/welcome');
          return;
        } else {
          toast.error('Associated branch not found. Contact your branch owner.');
          setLoading(false);
          return;
        }
      }

      toast.error('No user found with the provided credentials.');
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Invalid credentials. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <img src={BgAbstract} alt="Background" className="background-image" />

      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo-image" />
      </div>

      <div className="welcome-text">
        Welcome <br /> Back!
      </div>

      <div className="form-container">
        <div className="title">Sign In</div>
        <div className="subtitle">Welcome back! Please sign in to your account</div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <TextField
              label="Email ID"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              error={!email.includes('@') && email.length > 0}
              helperText={!email.includes('@') && email.length > 0 ? 'Invalid email format' : ''}
            />
          </div>

          <div className="form-group">
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="form-group">
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color="primary"
            />
            Remember Me
          </div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              position: 'relative',
              minHeight: '50px'
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>

          <div className="forgot-password">
            <a href="#" onClick={(e) => { e.preventDefault(); toast.info('Contact administrator for password reset'); }}>
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
