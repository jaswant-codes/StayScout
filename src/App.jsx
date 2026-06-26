import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AnalyticsProvider } from './hooks/useAnalytics';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const OwnerDashboard = lazy(() => import('./pages/OwnerDashboard'));
const AddProperty = lazy(() => import('./pages/AddProperty'));
const EditProperty = lazy(() => import('./pages/EditProperty'));
const Chat = lazy(() => import('./pages/Chat'));

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsProvider>
        <AuthProvider>
          <Suspense fallback={<Loader text="Loading..." />}>
            <Routes>
              <Route element={<Layout />}>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/property/:id" element={<PropertyDetails />} />

                {/* Student routes */}
                <Route
                  path="/student/dashboard"
                  element={
                    <ProtectedRoute role="student">
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute role="student">
                      <Chat />
                    </ProtectedRoute>
                  }
                />

                {/* Owner routes */}
                <Route
                  path="/owner/dashboard"
                  element={
                    <ProtectedRoute role="owner">
                      <OwnerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/owner/add-property"
                  element={
                    <ProtectedRoute role="owner">
                      <AddProperty />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/owner/edit-property/:id"
                  element={
                    <ProtectedRoute role="owner">
                      <EditProperty />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </AnalyticsProvider>
    </BrowserRouter>
  );
}
