import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShips } from "../../contexts/ShipsContext";
import ComponentList from "../Components/ComponentList";

const ShipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ships } = useShips();

  const ship = ships.find((s) => s.id === id);

  if (!ship) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Ship Not Found</h2>
        <button
          onClick={() => navigate("/ships")}
          className="text-blue-600 hover:text-blue-800 underline font-medium"
        >
          ← Back to Ships List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <button
        onClick={() => navigate("/ships")}
        className="mb-6 inline-block text-blue-600 hover:text-blue-800 underline font-semibold"
      >
        ← Back to Ships
      </button>

      <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{ship.name}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-semibold">IMO Number</p>
            <p className="text-lg">{ship.imo}</p>
          </div>
          <div>
            <p className="font-semibold">Flag</p>
            <p className="text-lg">{ship.flag}</p>
          </div>
          <div>
            <p className="font-semibold">Status</p>
            <p className={`text-lg font-semibold ${
              ship.status.toLowerCase() === "active"
                ? "text-green-600"
                : ship.status.toLowerCase() === "inactive"
                ? "text-red-600"
                : "text-yellow-600"
            }`}>
              {ship.status}
            </p>
          </div>
        </div>
      </div>

      {/* Components list */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Components</h2>
        <ComponentList shipId={ship.id} />
      </div>
    </div>
  );
};

export default ShipDetailPage;
