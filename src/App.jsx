import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PropertyDetails from './pages/PropertyDetails';
import StudentDashboard from './pages/StudentDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import Chat from './pages/Chat';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
      </AuthProvider>
    </BrowserRouter>
  );
}
