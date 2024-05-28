import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`)
      .then(response => response.json())
      .then(data => setTask(data))
      .catch(error => console.error('Error fetching task details:', error));
  }, [id]);

  const markAsCompleted = () => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PATCH', // Use PATCH method to update specific fields
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: true }), // Send updated data
    })
      .then(() => {
        // Redirect to task list or update state to reflect the change
      })
      .catch(error => console.error('Error marking task as completed:', error));
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      <p><strong>ID:</strong> {task.id}</p>
      <p><strong>Name:</strong> {task.name}</p>
      <p><strong>Details:</strong> {task.details}</p>
      <p><strong>Due Date:</strong> {task.due_date}</p>
      <button onClick={() => navigate(`/edit-task/${id}`)}>Edit</button>
      <button onClick={markAsCompleted}>Mark as Completed</button>
      <br />
      <Link to="/">Back to Task List</Link>
    </div>
  );
};

export default TaskDetail;
