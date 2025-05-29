import { useNotifications } from '../../contexts/NotificationContext';

const NotificationCenter = () => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(note => (
        <div key={note.id} className="bg-blue-200 p-4 rounded shadow-md flex justify-between">
          <span>{note.message}</span>
          <button onClick={() => dismissNotification(note.id)} className="ml-4 font-bold">×</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
