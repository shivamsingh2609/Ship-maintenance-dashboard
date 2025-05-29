import React from "react";
import JobList from "../components/Jobs/JobList";
import JobForm from "../components/Jobs/JobForm";
import ProtectedRoute from "../components/ProtectedRoute";

const JobsPage = () => {
  return (
    <ProtectedRoute permission="canViewJobs">
      <div className="px-6 py-4 space-y-6">
        <h2 className="text-2xl font-extrabold text-[#3e2723]">Task Management Center</h2>
        <JobForm />
        <JobList />
      </div>
    </ProtectedRoute>
  );
};

export default JobsPage;
