import logo from './logo.svg';
import "./Assets/styles.css";
import './App.css';
import EditTaskForm from './Components/EditTaskForm';


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './Components/TaskList';
import TaskDetail from './Components/TaskDetail';
import AddTaskForm from './Components/AddTaskForm';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TaskList />}/>
          <Route path="/task/:id" element={<TaskDetail/>}/>
          <Route path="/edit-task/:id" element={<EditTaskForm />} />
          <Route path="/create-task" element={<AddTaskForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;