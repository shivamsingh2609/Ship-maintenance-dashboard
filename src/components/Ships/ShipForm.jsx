import React, { useState, useEffect } from "react";
import { useShips } from "../../contexts/ShipsContext";
import { useNavigate, useParams } from "react-router-dom";

const ShipForm = () => {
  const { ships, addShip, updateShip } = useShips();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);
  const existing = ships.find((s) => s.id === id);

  const [form, setForm] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.imo.trim()) errs.imo = "IMO Number is required";
    else if (!/^\d+$/.test(form.imo)) errs.imo = "IMO Number must be numeric";
    if (!form.flag.trim()) errs.flag = "Flag is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (isEdit) {
      updateShip(id, form);
    } else {
      addShip({ ...form, id: `s${Date.now()}` });
    }
    navigate("/ships");
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: null }); // Clear error on change
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? "Edit Ship" : "Add New Ship"}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Ship Name"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* IMO Number */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700" htmlFor="imo">
            IMO Number <span className="text-red-500">*</span>
          </label>
          <input
            id="imo"
            type="text"
            value={form.imo}
            onChange={(e) => handleChange("imo", e.target.value)}
            placeholder="Numeric IMO Number"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.imo ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.imo && <p className="text-red-500 text-sm mt-1">{errors.imo}</p>}
        </div>

        {/* Flag */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700" htmlFor="flag">
            Flag <span className="text-red-500">*</span>
          </label>
          <input
            id="flag"
            type="text"
            value={form.flag}
            onChange={(e) => handleChange("flag", e.target.value)}
            placeholder="Country Flag"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.flag ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.flag && <p className="text-red-500 text-sm mt-1">{errors.flag}</p>}
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Active">Active</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ShipForm;
