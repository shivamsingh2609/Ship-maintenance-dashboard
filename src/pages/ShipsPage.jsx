import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ShipList from "../components/Ships/ShipList";
import ShipDetail from "../components/Ships/ShipDetail";

const ShipsPage = () => {
  const { id } = useParams();

  return (
    <div className="px-6 py-5 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-[#1e3a8a]">Fleet Overview</h2>
        <Link
          to="/ships/new"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 shadow-md"
        >
          Add New Vessel
        </Link>
      </div>

      {id ? <ShipDetail shipId={id} /> : <ShipList />}
    </div>
  );
};

export default ShipsPage;
