import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import ChangePassword from './components/Auth/ChangePassword';
import AdminDashboard from './components/Admin/AdminDashboard';
import Welcome from './components/Welcome';
import CreateBranch from './components/Branch/CreateBranch';
import EditBranch from './components/Branch/EditBranch';
import ActiveLog from './components/Log/ActiveLog';
import Leads from './components/Leads/Leads';
import Product from './components/Product/Product';
import Customize from './components/Customize/Customize';
import CreateSuperAdmin from './components/Profile/CreateSuperAdmin';
import LeadForm from './components/Leads/LeadForm';
import Profile from './components/Profile/Profile';
import Layout from './components/Profile/Layout';
import { UserProvider } from './components/Auth/UserContext';

const App = () => (
  <UserProvider>
  <Router>
    <Routes>
      {/* Uncomment and use if you have a Landing component */}
      {/* <Route path="/" element={<Landing />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      {/* <Route path="/admin-dashboard" element={<Leads />} /> */}
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/create-branch" element={<CreateBranch />} />
      <Route path="/edit-branch/:id" element={<EditBranch />} />
      <Route path="/product" element={<Product />} />
      <Route path="/customize" element={<Customize />} />
      <Route path="/active-log" element={<ActiveLog />} />
      <Route path="/" element={<Layout />}>
      <Route path="superadmin" element={<CreateSuperAdmin />} /> {/* Route for the LeadForm */}
      <Route path="profile" element={<Profile />} />
    </Route>
    </Routes>
  </Router>
  </UserProvider>
);

export default App;
