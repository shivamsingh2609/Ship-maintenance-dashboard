import React, { useState, useEffect } from "react";
import { useJobs } from "../../contexts/JobsContext";
import { useAuth } from "../../contexts/AuthContext";
import { useShips } from "../../contexts/ShipsContext";
import { getFromLocalStorage } from "../../utils/localStorageUtils";
import { useNotifications } from "../../contexts/NotificationContext";

const JobForm = () => {
  const { addJob } = useJobs();
  const { user } = useAuth();
  const { ships } = useShips();
  const { addNotification } = useNotifications();
  const components = ships.flatMap((ship) => ship.components || []);
  const users = getFromLocalStorage("loggedInUsers") || [];

  useEffect(() => {
    console.log("Logged-in users with usernames:", users);
  }, [users]);

  const [form, setForm] = useState({
    componentId: "",
    type: "",
    priority: "Medium",
    status: "Open",
    assignedEngineerId: "",
    scheduledDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedComponent = components.find((c) => c.id === form.componentId);
    if (!selectedComponent) return alert("Invalid component selected.");

    const job = {
      ...form,
      id: Date.now().toString(),
      shipId: selectedComponent.shipId,
    };
    addJob(job);
    addNotification("Job added successfully!", "success");
    setForm({
      componentId: "",
      type: "",
      priority: "Medium",
      status: "Open",
      assignedEngineerId: "",
      scheduledDate: "",
    });
  };

  const engineers = users
    .filter((u) => u.role === "Engineer")
    .map((e) => ({
      ...e,
      username: e.username || e.email.split("@")[0], // Fallback to email prefix if username is missing
    }));

  useEffect(() => {
    console.log("Engineers available for assignment:", engineers);
  }, [engineers]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 rounded mb-4 bg-white border border-black"
    >
      <h3 className="text-lg font-semibold">Create Maintenance Job</h3>

      <select
        name="componentId"
        value={form.componentId}
        onChange={handleChange}
        required
        className="w-full border p-2"
      >
        <option value="">Select Component</option>
        {components.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} (Ship ID: {c.shipId})
          </option>
        ))}
      </select>

      <input
        type="text"
        name="type"
        value={form.type}
        onChange={handleChange}
        placeholder="Job Type"
        required
        className="w-full border p-2"
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="w-full border p-2"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        name="assignedEngineerId"
        value={form.assignedEngineerId}
        onChange={handleChange}
        required
        className="w-full border p-2"
      >
        <option value="">Assign Engineer</option>
        {engineers.map((e) => (
          <option key={e.id} value={e.id}>
            {e.username}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="scheduledDate"
        value={form.scheduledDate}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Job
      </button>
    </form>
  );
};

export default JobForm;
