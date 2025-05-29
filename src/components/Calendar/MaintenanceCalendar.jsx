import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useJobs } from '../../contexts/JobsContext';
import { useMemo } from 'react';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MaintenanceCalendar = ({ onSelectDate }) => {
  const { jobs } = useJobs();

  const events = useMemo(() =>
    jobs.map(job => ({
      title: job.jobType,
      start: new Date(job.scheduledDate),
      end: new Date(job.scheduledDate),
      allDay: true,
      resource: job,
    })), [jobs]
  );

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600 }}
      onSelectEvent={(event) => onSelectDate(event.start)}
    />
  );
};

export default MaintenanceCalendar;
