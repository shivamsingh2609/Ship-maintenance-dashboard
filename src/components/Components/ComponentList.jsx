import React, { useState } from "react";
import { useShips } from "../../contexts/ShipsContext";

const ComponentList = ({ shipId }) => {
  const {
    ships,
    addComponentToShip,
    editComponentInShip,
    deleteComponentFromShip,
  } = useShips();

  const ship = ships.find((s) => s.id === shipId);
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: "",
  });
  const [editId, setEditId] = useState(null);

  if (!ship) return <p className="text-red-600 font-semibold">Ship not found.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const componentData = {
      ...formData,
      id: editId || Date.now().toString(),
    };

    if (editId) {
      editComponentInShip(shipId, editId, formData);
    } else {
      addComponentToShip(shipId, componentData);
    }

    setFormData({
      name: "",
      serialNumber: "",
      installDate: "",
      lastMaintenanceDate: "",
    });
    setEditId(null);
  };

  const handleEdit = (component) => {
    setEditId(component.id);
    setFormData({
      name: component.name,
      serialNumber: component.serialNumber,
      installDate: component.installDate,
      lastMaintenanceDate: component.lastMaintenanceDate,
    });
  };

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Components for <span className="text-blue-600">{ship.name}</span>
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Component Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Serial Number"
          value={formData.serialNumber}
          onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="flex flex-col">
          <span className="mb-1 font-medium text-gray-700">Install Date</span>
          <input
            type="date"
            value={formData.installDate}
            onChange={(e) => setFormData({ ...formData, installDate: e.target.value })}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 font-medium text-gray-700">Last Maintenance Date</span>
          <input
            type="date"
            value={formData.lastMaintenanceDate}
            onChange={(e) => setFormData({ ...formData, lastMaintenanceDate: e.target.value })}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {editId ? "Update" : "Add"} Component
          </button>
        </div>
      </form>

      {ship.components && ship.components.length > 0 ? (
        <ul className="space-y-4">
          {ship.components.map((comp) => (
            <li
              key={comp.id}
              className="border rounded p-4 shadow-sm hover:shadow-md transition bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg text-gray-900">{comp.name}</p>
                  <p className="text-gray-700 text-sm">Serial Number: <span className="font-mono">{comp.serialNumber}</span></p>
                  <p className="text-gray-600 text-sm">
                    Installed: <time dateTime={comp.installDate}>{comp.installDate}</time>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Last Maintenance: <time dateTime={comp.lastMaintenanceDate}>{comp.lastMaintenanceDate}</time>
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(comp)}
                    className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                    aria-label={`Edit component ${comp.name}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(`Are you sure you want to delete "${comp.name}"?`)
                      ) {
                        deleteComponentFromShip(shipId, comp.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 font-medium focus:outline-none"
                    aria-label={`Delete component ${comp.name}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 italic">No components added yet.</p>
      )}
    </div>
  );
};

export default ComponentList;
