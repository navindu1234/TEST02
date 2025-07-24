import React, { useState } from 'react';
import { db, collection, addDoc } from '../firebase/config';

const AddTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        createdAt: new Date()
      });
      setTitle('');
      setDescription('');
      if (onTaskAdded) onTaskAdded();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  return (
    <div className="add-task-container">
      <h2>Add a Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
            rows="3"
          />
        </div>
        <button type="submit" className="add-button">Add</button>
      </form>
    </div>
  );
};

export default AddTask;