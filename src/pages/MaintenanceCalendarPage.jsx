import MaintenanceCalendar from "../components/Calendar/MaintenanceCalendar";
import JobList from "../components/Jobs/JobList";
import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const MaintenanceCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <ProtectedRoute permission="canViewOverdueMaintenance">
      <div className="px-6 py-4 space-y-6">
        <h2 className="text-3xl font-extrabold text-[#004d40]">Scheduled Task Timeline</h2>

        <MaintenanceCalendar onSelectDate={setSelectedDate} />

        {selectedDate && (
          <div>
            <h3 className="text-2xl font-semibold text-[#00695c] mb-3">
              Assigned Tasks for {selectedDate.toDateString()}:
            </h3>
            <JobList filterDate={selectedDate} />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default MaintenanceCalendarPage;
