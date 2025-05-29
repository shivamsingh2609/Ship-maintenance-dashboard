import React, { useState } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useShips } from "../../contexts/ShipsContext";
import { getFromLocalStorage } from "../../utils/localStorageUtils";

const JobList = ({ filterDate = null }) => {
  const { jobs, updateJob, deleteJob } = useJobs();
  const { ships } = useShips();
  const users = getFromLocalStorage("loggedInUsers") || [];

  const components = ships.flatMap((ship) => ship.components || []);

  const [filter, setFilter] = useState({ status: "", priority: "" });

  const filteredJobs = jobs.filter((job) => {
    const matchStatus = !filter.status || job.status === filter.status;
    const matchPriority = !filter.priority || job.priority === filter.priority;
    const matchDate =
      !filterDate ||
      new Date(job.scheduledDate).toDateString() ===
        new Date(filterDate).toDateString();

    return matchStatus && matchPriority && matchDate;
  });

  const handleStatusChange = (jobId, newStatus) => {
    updateJob(jobId, { status: newStatus });
  };

  const getEngineerName = (id) => {
    const engineer = users.find((u) => u.id === id);
    return engineer
      ? engineer.username || engineer.email.split("@")[0]
      : "Unknown";
  };

  const getComponentName = (id) => {
    const comp = components.find((c) => c.id === id);
    return comp ? comp.name : "Unknown";
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Jobs List</h3>

      {/* ✅ Filters always visible */}
      <div className="flex gap-4 mb-4">
        <select
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="border p-1"
          value={filter.status}
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          className="border p-1"
          value={filter.priority}
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* ✅ Job Results */}
      {filteredJobs.length === 0 ? (
        <p className="text-gray-600">No jobs found for this selection.</p>
      ) : (
        filteredJobs.map((job) => (
          <div key={job.id} className="border p-4 rounded mb-2">
            <p>
              <strong>Component:</strong> {getComponentName(job.componentId)}
            </p>
            <p>
              <strong>Job Type:</strong> {job.type}
            </p>
            <p>
              <strong>Priority:</strong> {job.priority}
            </p>
            <p>
              <strong>Status:</strong>
              <select
                value={job.status}
                onChange={(e) => handleStatusChange(job.id, e.target.value)}
                className="ml-2 border p-1"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </p>
            <p>
              <strong>Engineer:</strong>{" "}
              {getEngineerName(job.assignedEngineerId)}
            </p>
            <p>
              <strong>Scheduled:</strong>{" "}
              {new Date(job.scheduledDate).toDateString()}
            </p>
            <button
              onClick={() => deleteJob(job.id)}
              className="text-red-500 text-sm mt-2"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
