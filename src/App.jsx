import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AnalyticsProvider } from './hooks/useAnalytics';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const OwnerDashboard = lazy(() => import('./pages/OwnerDashboard'));
const OwnerCRM = lazy(() => import('./pages/OwnerCRM'));
const OwnerTrustCenter = lazy(() => import('./pages/OwnerTrustCenter'));
const AddProperty = lazy(() => import('./pages/AddProperty'));
const PropertyManager = lazy(() => import('./pages/PropertyManager'));
const StudentVisits = lazy(() => import('./pages/StudentVisits'));
const OwnerVisits = lazy(() => import('./pages/OwnerVisits'));
const Inbox = lazy(() => import('./pages/Inbox'));
const Search = lazy(() => import('./pages/Search'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminListings = lazy(() => import('./pages/admin/AdminListings'));
const AdminVerification = lazy(() => import('./pages/admin/AdminVerification'));
const AdminSupport = lazy(() => import('./pages/admin/AdminSupport'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));

function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/25 animate-pulse-glow">
          <span className="text-xl font-bold text-white tracking-tighter">SS</span>
        </div>
        <div className="w-6 h-6 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
        <p className="text-sm font-medium text-text-secondary">Loading StayScout...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsProvider>
        <AuthProvider>
          <Suspense fallback={<FullScreenLoader />}>
            <Routes>
              <Route element={<Layout />}>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/search" element={<Search />} />

                {/* Protected routes */}
                <Route
                  path="/student/dashboard"
                  element={
                    <ProtectedRoute>
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/visits"
                  element={
                    <ProtectedRoute>
                      <StudentVisits />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inbox"
                  element={
                    <ProtectedRoute>
                      <Inbox />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/owner/dashboard"
                  element={
                    <ProtectedRoute>
                      <OwnerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/owner/crm"
                  element={
                    <ProtectedRoute>
                      <OwnerCRM />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/owner/trust-center"
                  element={
                    <ProtectedRoute>
                      <OwnerTrustCenter />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/owner/add-property"
                  element={
                    <ProtectedRoute>
                      <AddProperty />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/owner/edit-property/:id"
                  element={
                    <ProtectedRoute>
                      <PropertyManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/owner/visits"
                  element={
                    <ProtectedRoute>
                      <OwnerVisits />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Admin routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="listings" element={<AdminListings />} />
                <Route path="verify" element={<AdminVerification />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="support" element={<AdminSupport />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </AnalyticsProvider>
    </BrowserRouter>
  );
}
