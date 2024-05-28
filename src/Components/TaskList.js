import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TaskList.css';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const deleteTask = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => console.error('Error deleting task:', error));
    }
  };

  const markAsCompleted = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: true }),
    })
      .then(() => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task));
      })
      .catch(error => console.error('Error marking task as completed:', error));
  };

  return (
    <div className="task-list-container">
      <h2>Task List
       
      </h2>
      <Link to="/create-task">
        <button
          className="create-task-button"
          style={{ backgroundColor: 'blue', color: 'white' }}
        >
          Create Task
        </button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.details}</td>
              <td>{task.dueDate}</td>
              <td>
                <Link to={`/task/${task.id}`}>View Details</Link>
                <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
                <button onClick={() => markAsCompleted(task.id)} style={{ marginLeft: '10px' }}>
                  Mark as Completed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
