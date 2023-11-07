import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { serverLink } from "../main";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AppContext } from "../components/AppContextProvider";
import { Navigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  startDate: string; // Assuming ISO format date string
  endDate: string;   // Assuming ISO format date string
}

interface TaskEvent {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

const SchedulerPage: React.FC = () => {
  const { isAuth } = useContext(AppContext);
  const [events, setEvents] = useState<TaskEvent[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`${serverLink}/task/getAllTask`, {
          withCredentials: true,
        });
        const fetchedEvents: TaskEvent[] = data.userTasks.map((task: Task) => ({
          title: task.title,
          start: new Date(task.startDate),
          end: new Date(task.endDate),
          allDay: false,
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month']} // Only show the month view
      />
    </div>
  );
};

export default SchedulerPage;
