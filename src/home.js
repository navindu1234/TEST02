import React from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './index.css';

const Home = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My To-Do App</h1>
      </header>
      <main className="app-main">
        <AddTask />
        <TaskList />
      </main>
    </div>
  );
};

export default Home;