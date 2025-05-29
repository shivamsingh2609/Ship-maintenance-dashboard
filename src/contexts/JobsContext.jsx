import React, { createContext, useContext, useEffect, useState } from "react";
import { useNotifications } from "../contexts/NotificationContext";
const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const saveJobs = (updatedJobs) => {
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const addJob = (job) => {
    const updatedJobs = [...jobs, job];
    saveJobs(updatedJobs);
    addNotification(
      `Job of type "${job.type}" added for component ID: ${job.componentId}`
    );
  };

  const updateJob = (jobId, updatedFields) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, ...updatedFields } : job
    );
    saveJobs(updatedJobs);
    addNotification(`Job with ID: ${jobId} updated successfully.`);
  };

  const deleteJob = (jobId) => {
    const updatedJobs = jobs.filter((job) => job.id !== jobId);
    saveJobs(updatedJobs);
    addNotification(`Job with ID: ${jobId} deleted.`);
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => useContext(JobsContext);
