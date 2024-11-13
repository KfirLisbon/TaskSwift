import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './features.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Localizer for calendar
const localizer = momentLocalizer(moment);

// Constants (Sample data and options)
const people = [
  { name: 'user1', color: '#FF5733' },
  { name: 'user2', color: '#33FF57' },
  { name: 'user3', color: '#3357FF' },
];

const colors = [
  { name: 'Red', hex: '#FF5733' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Yellow', hex: '#FFFF33' },
  { name: 'Green', hex: '#33FF57' },
  { name: 'Blue', hex: '#3357FF' },
];

const reminderOptions = [
  { label: "No Reminder", value: 0 },
  { label: "1 minute before", value: 1 },  // Added 1 minute before reminder
  { label: "5 minutes before", value: 5 },
  { label: "10 minutes before", value: 10 },
  { label: "15 minutes before", value: 15 },
  { label: "30 minutes before", value: 30 },
  { label: "1 hour before", value: 60 },
  { label: "4 hours before", value: 240 },
  { label: "1 day before", value: 1440 },
  // Removed "1 week before" option
];

// Features Component
const Features = () => {
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    assignedTo: '',
    color: '#FFFFFF',
    reminderTime: 0,
    email: '',
  });
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Function to reset the task input fields
  const resetFields = () => {
    setTaskDetails({
      title: '',
      start: new Date(),
      end: new Date(),
      assignedTo: '',
      color: '#FFFFFF',
      reminderTime: 0,
      email: '',
    });
  };

  // Function to send email reminders
  const scheduleEmailReminder = async (task) => {
    try {
      await fetch('http://localhost:5000/send-reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: taskDetails.email,
          title: task.title,
          reminderTime: task.reminderTime,
        }),
      });
    } catch (error) {
      console.error('Error scheduling reminder:', error);
    }
  };

  // Function to add or update a task
  const handleAddOrUpdateTask = () => {
    const newTask = {
      id: Date.now(),
      ...taskDetails,
      isAgenda: true,
    };

    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? newTask : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      toast.success("Task updated successfully!");
    } else {
      setTasks([...tasks, newTask]);
      toast.success("Task added successfully!");
    }

    resetFields();
    scheduleEmailReminder(newTask);
    setReminderToast(newTask); // Set reminder for the task
  };

  // Function to handle editing of a task
  const handleEditTask = (taskToEdit) => {
    setEditingTask(taskToEdit);
    setTaskDetails(taskToEdit);
  };

  // Function to handle removal of a task
  const handleRemoveTask = (taskToRemove) => {
    if (window.confirm(`Are you sure you want to remove "${taskToRemove.title}"?`)) {
      setTasks(tasks.filter(task => task.id !== taskToRemove.id));
      toast.info("Task removed successfully!");
    }
  };

  // Event style getter for custom styling
  const eventStyleGetter = (event) => ({
    style: { backgroundColor: event.color },
  });

  // Custom Event Component
  const CustomEvent = ({ event }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuToggle = () => setShowMenu((prev) => !prev);

    const handleOutsideClick = useCallback(
      (e) => {
        if (showMenu && !e.target.closest('.menu')) {
          setShowMenu(false);
        }
      },
      [showMenu]
    );

    useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [handleOutsideClick]);

    return (
      <div style={{ position: 'relative' }}>
        <span>{event.title}</span>
        {event.isAgenda && (
          <button
            onClick={handleMenuToggle}
            style={{
              background: 'none',
              border: 'none',
              position: 'absolute',
              right: 0,
              top: 0,
              cursor: 'pointer',
              color: 'black',
              fontSize: '16px',
            }}
          >
            •••
          </button>
        )}
        {showMenu && (
          <div className="menu">
            <button onClick={() => handleEditTask(event)}>Rename</button>
            <button onClick={() => handleRemoveTask(event)}>Remove</button>
            <select
              value={taskDetails.assignedTo}
              onChange={(e) => {
                setTaskDetails({ ...taskDetails, assignedTo: e.target.value });
                setShowMenu(false);
              }}
            >
              <option value="">Re-assign To</option>
              {people
                .filter((person) => person.name !== event.assignedTo)
                .map((person) => (
                  <option key={person.name} value={person.name}>
                    {person.name}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  // Function to handle reminder toast
  const setReminderToast = (task) => {
    const reminderTime = task.reminderTime; // reminder in minutes
    if (reminderTime > 0) {
      const taskTime = new Date(task.start);
      const reminderTimeInMs = reminderTime * 60 * 1000; // Convert to milliseconds
      const reminderDate = taskTime - reminderTimeInMs; // Calculate when to show the reminder

      const timeDifference = reminderDate - new Date();

      if (timeDifference > 0) {
        setTimeout(() => {
          toast.info(`Reminder: "${task.title}" starts in ${reminderTime} minute(s)!`);
        }, timeDifference);
      }
    }
  };

  return (
    <div>
      {/* Features Text Section */}
      <div className="features-text">
        <h2 className="features-header">Unlocking Productivity: The Power of TaskSwift</h2>
        <p>
          In our fast-paced world, where distractions are just a click away and to-do lists seem to multiply like rabbits,
          managing tasks efficiently is more crucial than ever. Enter project management applications—your digital allies in
          the quest for productivity and effectiveness. By streamlining tasks and organizing projects, these tools do more than
          just keep you on track; they can actually save you precious time. Let’s explore how they work their magic, along with the
          potential pitfalls of going it alone.
        </p>
        {/* ... (rest of the features text) */}
      </div>

      {/* Calendar and Task Input Section */}
      <div className="Calendar-Input-Container">
        <div className="input-container">
          <input
            className="task-input"
            type="text"
            placeholder="Task Title"
            value={taskDetails.title}
            onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
          />
          <input
            className="from-date"
            type="datetime-local"
            value={taskDetails.start.toISOString().slice(0, 16)}
            onChange={(e) => setTaskDetails({ ...taskDetails, start: new Date(e.target.value) })}
          />
          <input
            className="to-date"
            type="datetime-local"
            value={taskDetails.end.toISOString().slice(0, 16)}
            onChange={(e) => setTaskDetails({ ...taskDetails, end: new Date(e.target.value) })}
          />
          <select
            value={taskDetails.assignedTo}
            onChange={(e) => setTaskDetails({ ...taskDetails, assignedTo: e.target.value })}
          >
            <option value="">Assign To</option>
            {people.map((person) => (
              <option key={person.name} value={person.name}>
                {person.name}
              </option>
            ))}
          </select>
          <div className="color-picker">
            {colors.map((color) => (
              <div
                key={color.name}
                className="color-option"
                style={{ backgroundColor: color.hex }}
                onClick={() => setTaskDetails({ ...taskDetails, color: color.hex })}
              />
            ))}
          </div>
          <select
            value={taskDetails.reminderTime}
            onChange={(e) => setTaskDetails({ ...taskDetails, reminderTime: parseInt(e.target.value) })}
          >
            {reminderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="add-task-button" onClick={handleAddOrUpdateTask}>
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>
        
        <div className="calendar-container">
          <Calendar
            className="calendar"
            localizer={localizer}
            events={tasks}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: '50px' }}
            onSelectEvent={handleEditTask}
            eventPropGetter={eventStyleGetter}
            components={{
              event: CustomEvent
            }}
          />
        </div>
      </div>

      <ToastContainer />

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} TaskSwift. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Features;
