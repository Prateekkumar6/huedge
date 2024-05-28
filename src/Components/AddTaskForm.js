import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTaskForm = () => {
  const [task, setTask] = useState({ name: '', details: '', due_date: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/'); // Redirect to the task list after adding the task
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={task.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Details:
          <textarea name="details" value={task.details} onChange={handleChange}></textarea>
        </label>
        <br />
        <label>
          Due Date:
          <input type="date" name="due_date" value={task.due_date} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
