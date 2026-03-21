import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './components/Auth/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components for better performance
const Login = lazy(() => import('./components/Auth/Login'));
const ChangePassword = lazy(() => import('./components/Auth/ChangePassword'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));
const UserDashboard = lazy(() => import('./components/UserDashboard/UserDashboard'));
const CreateBranch = lazy(() => import('./components/Branch/CreateBranch'));
const EditBranch = lazy(() => import('./components/Branch/EditBranch'));
const ActiveLog = lazy(() => import('./components/Log/ActiveLog'));
const Leads = lazy(() => import('./components/Leads/Leads'));
const Booking = lazy(() => import('./components/UserDashboard/Availability/Booking'));
const Customize = lazy(() => import('./components/Customize/Customize'));
const CreateSuperAdmin = lazy(() => import('./components/Profile/CreateSuperAdmin'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Layout = lazy(() => import('./components/Profile/Layout'));
const AddLead = lazy(() => import('./components/Leads/Addlead'));
const EditLead = lazy(() => import('./components/Leads/EditLead'));
const User = lazy(() => import('./components/UserDashboard/User'));
const AddUser = lazy(() => import('./components/UserDashboard/Adduser'));
const AddProduct = lazy(() => import('./components/Product/AddProduct'));
const ProductDashboard = lazy(() => import('./components/Product/Product'));
const Availability = lazy(() => import('./components/UserDashboard/Availability/Availability'));
const EditUser = lazy(() => import('./components/UserDashboard/EditUser'));
const ClientLeadsDashboard = lazy(() => import('./components/UserDashboard/Clienleads/CleadsDashboard'));
const ClientLeads = lazy(() => import('./components/UserDashboard/Clienleads/Cleads'));
const Overview = lazy(() => import('./components/Profile/overview'));

const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    Loading...
  </div>
);

const App = () => (
  <ErrorBoundary>
    <UserProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/change-password" element={<ChangePassword />} />
            
            {/* Protected Admin Routes */}
            <Route path="/branches" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/branches/active" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/branches/deactive" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/branches/expiring-soon" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Protected Leads Routes */}
            <Route path="/leads" element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            } />
            <Route path="/leads/fresh-leads" element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            } />
            <Route path="/leads/detail-shared" element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            } />
            <Route path="/leads/demo-scheduled" element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            } />
            <Route path="/leads/demo-done" element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            } />
            <Route path="/leads/lead-won" element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            } />
            <Route path="/leads/lead-lost" element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            } />
            
            {/* Protected User Dashboard Routes */}
            <Route path="/welcome" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/create-branch" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <CreateBranch />
              </ProtectedRoute>
            } />
            <Route path="/edit-branch/:id" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <EditBranch />
              </ProtectedRoute>
            } />
            <Route path="/customize" element={
              <ProtectedRoute>
                <Customize />
              </ProtectedRoute>
            } />
            <Route path="/active-log" element={
              <ProtectedRoute>
                <ActiveLog />
              </ProtectedRoute>
            } />
            <Route path="/create-lead" element={
              <ProtectedRoute>
                <AddLead />
              </ProtectedRoute>
            } />
            <Route path="/addlead" element={
              <ProtectedRoute>
                <ClientLeads />
              </ProtectedRoute>
            } />
            <Route path="/edit-lead/:id" element={
              <ProtectedRoute>
                <EditLead />
              </ProtectedRoute>
            } />
            <Route path="/usersidebar/users" element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            } />
            <Route path="/adduser" element={
              <ProtectedRoute allowedRoles={['Super Admin', 'Branch Manager']}>
                <AddUser />
              </ProtectedRoute>
            } />
            <Route path="/addproduct" element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            } />
            <Route path="/productdashboard" element={
              <ProtectedRoute>
                <ProductDashboard />
              </ProtectedRoute>
            } />
            <Route path="/usersidebar/availability" element={
              <ProtectedRoute>
                <Availability />
              </ProtectedRoute>
            } />
            <Route path="/usersidebar/booking" element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />
            <Route path="/edituser/:id" element={
              <ProtectedRoute allowedRoles={['Super Admin', 'Branch Manager']}>
                <EditUser />
              </ProtectedRoute>
            } />
            <Route path="/usersidebar/leads" element={
              <ProtectedRoute>
                <ClientLeadsDashboard />
              </ProtectedRoute>
            } />
            
            {/* Profile Routes */}
            <Route path="/" element={<Layout />}>
              <Route path="superadmin" element={
                <ProtectedRoute allowedRoles={['Super Admin']}>
                  <CreateSuperAdmin />
                </ProtectedRoute>
              } />
              <Route path="profile" element={<Profile />} />
              <Route path="overview" element={<Overview />} />
            </Route>
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  </ErrorBoundary>
);

export default App;
