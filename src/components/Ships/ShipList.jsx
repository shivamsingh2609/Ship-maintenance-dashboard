import React from "react";
import { useShips } from "../../contexts/ShipsContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ShipList = () => {
  const { ships, deleteShip } = useShips();
  const navigate = useNavigate();
  const { checkPermission } = useAuth();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Ships</h2>

        {checkPermission("canManageShips") && (
          <button
            onClick={() => navigate("/ships/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Ship
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["Name", "IMO", "Flag", "Status", "Actions"].map((header) => (
                <th
                  key={header}
                  className="border border-gray-300 text-left px-4 py-2 text-gray-700 font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {ships.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No ships available.
                </td>
              </tr>
            ) : (
              ships.map((ship) => (
                <tr
                  key={ship.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{ship.name}</td>
                  <td className="px-4 py-3">{ship.imo}</td>
                  <td className="px-4 py-3">{ship.flag}</td>
                  <td className="px-4 py-3">{ship.status}</td>

                  <td className="px-4 py-3 flex gap-2 justify-start">
                    <button
                      onClick={() => navigate(`/ships/${ship.id}`)}
                      className="text-blue-600 hover:underline font-medium"
                      aria-label={`View details of ${ship.name}`}
                    >
                      View
                    </button>

                    {checkPermission("canManageShips") && (
                      <>
                        <button
                          onClick={() => navigate(`/ships/edit/${ship.id}`)}
                          className="text-green-600 hover:underline font-medium"
                          aria-label={`Edit ${ship.name}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete "${ship.name}"?`
                              )
                            ) {
                              deleteShip(ship.id);
                            }
                          }}
                          className="text-red-600 hover:underline font-medium"
                          aria-label={`Delete ${ship.name}`}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipList;
