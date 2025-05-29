import { useJobs } from "../contexts/JobsContext";
import { useShips } from "../contexts/ShipsContext";
import { useAuth } from "../contexts/AuthContext";
import { Link, Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

const DashboardPage = () => {
  const { jobs } = useJobs();
  const { ships } = useShips();
  const { logout } = useAuth();
  const allComponents = ships.flatMap((ship) => ship.components || []);

  const totalShips = ships.length;
  const jobsInProgress = jobs.filter((j) => j.status === "In Progress").length;
  const jobsCompleted = jobs.filter((j) => j.status === "Completed").length;

  const overdueComponents = allComponents.filter((c) => {
    const job = jobs.find((j) => j.componentId === c.id);
    if (!job) return false;
    return new Date(job.scheduledDate) < new Date() && job.status !== "Completed";
  });

  return (
    <ProtectedRoute permission="canAccessDashboard">
      <div className="p-6 space-y-4 text-[#2c2c2c]">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">
            <h2 className="text-3xl font-extrabold text-[#4e342e]">Ship Maintenance Hub</h2>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex-none"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/dashboard/jobs"
            className="bg-orange-500 text-white p-4 rounded-lg shadow hover:bg-orange-600"
          >
            Taskboard
          </Link>
          <Link
            to="/ships"
            className="bg-teal-500 text-white p-4 rounded-lg shadow hover:bg-teal-600"
          >
            Fleet Overview
          </Link>
          <Link
            to="/dashboard/calendar"
            className="bg-indigo-500 text-white p-4 rounded-lg shadow hover:bg-indigo-600"
          >
            Schedule View
          </Link>
        </div>

        {/* Render nested routes */}
        <Outlet />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#3e2723]">
          <div className="bg-white rounded-xl p-4 shadow font-semibold">
            Total Vessels: {totalShips}
          </div>
          <div className="bg-white rounded-xl p-4 shadow font-semibold">
            Active Tasks: {jobsInProgress}
          </div>
          <div className="bg-white rounded-xl p-4 shadow font-semibold">
            Completed Tasks: {jobsCompleted}
          </div>
        </div>

        <div className="mt-6 text-[#4e342e]">
          <h3 className="text-xl font-bold">Overdue Component Alerts</h3>
          {overdueComponents.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2">
              {overdueComponents.map((comp) => {
                const ship = ships.find((ship) =>
                  ship.components?.some((c) => c.id === comp.id)
                );

                const job = jobs.find((j) => j.componentId === comp.id);

                return (
                  <li key={comp.id} className="text-sm">
                    <div>
                      <strong>Unit:</strong> {comp.name}
                    </div>
                    <div>
                      <strong>Assigned Ship:</strong> {ship?.name || "Unknown Ship"}
                    </div>
                    <div>
                      <strong>Due Date:</strong>{" "}
                      {new Date(job?.scheduledDate).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Current Status:</strong> {job?.status || "Unknown"}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="italic">No components overdue. System is on track!</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
