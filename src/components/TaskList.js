import React, { useEffect, useState } from 'react';
import { db, collection, query, limit, orderBy, onSnapshot, updateDoc, doc } from '../firebase/config';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'tasks'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  const handleTaskComplete = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        completed: true,
        completedAt: new Date()
      });
    } catch (error) {
      console.error("Error completing task: ", error);
    }
  };

  return (
    <div className="task-list-container">
      <h2>Recent Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-header">
                <h3>{task.title}</h3>
                <div className="task-actions">
                  {!task.completed && (
                    <button 
                      onClick={() => handleTaskComplete(task.id)}
                      className="complete-button"
                    >
                      Done
                    </button>
                  )}
                  <span className="show-button">Show</span>
                </div>
              </div>
              <p className="task-description">{task.description}</p>
              {task.completed && (
                <div className="completed-indicator">
                  <span className="checkmark">✓</span>
                  <span>Completed</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;