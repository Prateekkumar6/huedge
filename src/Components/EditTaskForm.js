import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ name: '', details: '', due_date: '' });

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`)
      .then(response => response.json())
      .then(data => setTask(data))
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(() => navigate(`/task/${id}`))
      .catch(error => console.error('Error updating task:', error));
  };

  return (
    <div>
      <h2>Edit Task</h2>
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
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTaskForm;
