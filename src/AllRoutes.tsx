import { Routes, Route, Navigate } from "react-router-dom";
import {
  AuthLayout,
  VerificationSuccessPage,
  OTPVerifyPage,
} from "./pages/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage";
import PersonalDashboard from "./pages/Dashboard/PersonalDashboard";
import WorkspaceDashboard from "./pages/Dashboard/WorkspaceDashboard";
import ProjectDetails from "./components/dashboard/Workspace/ProjectDetails";
import { useAuthStore } from "./store/authStore";
import { useWorkspaceStore } from "./store/workspaceStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

// Redirect Authenticated User Component
const RedirectAuthenticatedUser = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();
  const { currentWorkspace } = useWorkspaceStore();

  if (isAuthenticated) {
    // If authenticated, redirect to the current workspace dashboard
    return (
      <Navigate
        to={
          currentWorkspace === "personal"
            ? "/dashboard"
            : `/dashboard/${currentWorkspace}`
        }
        replace
      />
    );
  }
  return children;
};
export default function AllRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/otp-verify" element={<OTPVerifyPage />} />
      <Route
        path="/auth"
        element={
          <RedirectAuthenticatedUser>
            <AuthLayout />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/verification-success"
        element={<VerificationSuccessPage />}
      />

      {/* Protected routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<PersonalDashboard />} />{" "}
        {/* Personal dashboard */}
        <Route path=":workspaceId" element={<WorkspaceDashboard />}>
          <Route path="projects/:projectId" element={<ProjectDetails />} />
        </Route>
        {/* Workspace dashboard */}
      </Route>
    </Routes>
  );
}
