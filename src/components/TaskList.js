import React, { useEffect, useState } from 'react';
import { db, collection, query, limit, orderBy, onSnapshot, updateDoc, doc } from '../firebase/config';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, 'tasks'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const tasksData = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ 
            id: doc.id, 
            title: doc.data().title || 'No title',
            description: doc.data().description || '',
            completed: doc.data().completed || false,
            createdAt: doc.data().createdAt?.toDate() || new Date()
          });
        });
        setTasks(tasksData);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setError("Failed to load tasks");
        setLoading(false);
      }
    );

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
      setError("Failed to complete task");
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-list-container">
      <h2>Recent Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks found. Add your first task!</p>
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