// App.jsx
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ShipsProvider } from "./contexts/ShipsContext";
import LoginForm from "./components/Authentication/LoginForm";
import DashboardPage from "./pages/DashboardPage";
import ShipsPage from "./pages/ShipsPage";
import ShipForm from "./components/Ships/ShipForm";
import ShipDetail from "./components/Ships/ShipDetail";
import { JobsProvider } from "./contexts/JobsContext";
import JobsPage from "./pages/JobsPage";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationCenter from "./components/Notifications/NotificationCenter";
import MaintenanceCalendarPage from "./pages/MaintenanceCalendarPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log("PrivateRoute - user:", user, "loading:", loading);

  if (loading) {
    return <p>Loading...</p>;
  }

  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ShipsProvider>
          <NotificationProvider>
            <JobsProvider>
              <NotificationCenter />
              <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <div className="flex-1 text-center">
                  <h1 className="text-xl font-bold">Ship Maintenance</h1>
                </div>
                <nav className="flex-none">
                  <Link
                    to="/dashboard"
                    className="text-white hover:underline px-4"
                  >
                    Home
                  </Link>
                </nav>
              </header>
              <Routes>
                <Route path="/" element={<LoginForm />} />

                <Route
                  path="/dashboard/*"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                >
                  <Route path="jobs" element={<JobsPage />} />
                  <Route
                    path="calendar"
                    element={<MaintenanceCalendarPage />}
                  />
                </Route>

                <Route
                  path="/ships"
                  element={
                    <PrivateRoute>
                      <ShipsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ships/new"
                  element={
                    <PrivateRoute>
                      <ShipForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ships/edit/:id"
                  element={
                    <PrivateRoute>
                      <ShipForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ships/:id"
                  element={
                    <PrivateRoute>
                      <ShipDetail />
                    </PrivateRoute>
                  }
                />

                {/* Unauthorized route should be last */}
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
              </Routes>
            </JobsProvider>
          </NotificationProvider>
        </ShipsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
