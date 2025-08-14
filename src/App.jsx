import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { FiPlus, FiEdit3, FiTrash2, FiCheckCircle, FiCircle } from "react-icons/fi";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const newTask = prompt("Edit your task:", tasks[index].text);
    if (newTask !== null && newTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = newTask;
      setTasks(updatedTasks);
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <div className="todo-container">
          <div className="header-section">
            <h1 className="app-title">
              <span className="gradient-text">Task</span>Master
            </h1>
            <p className="app-subtitle">Organize your life, one task at a time</p>
            
            {totalCount > 0 && (
              <div className="progress-section">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                  ></div>
                </div>
                <p className="progress-text">{completedCount} of {totalCount} tasks completed</p>
              </div>
            )}
          </div>

          <div className="add-task-section">
            <h2 className="section-title">Add New Task</h2>
            <div className="input-group">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done?"
                className="task-input"
              />
              <button 
                onClick={handleAddTask} 
                className="add-button"
                disabled={!task.trim()}
              >
                <FiPlus size={20} />
                Add Task
              </button>
            </div>
          </div>

          <div className="tasks-section">
            <h2 className="section-title">
              Your Tasks 
              {totalCount > 0 && <span className="task-count">({totalCount})</span>}
            </h2>
            
            {tasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No tasks yet</h3>
                <p>Add your first task above to get started!</p>
              </div>
            ) : (
              <div className="tasks-list">
                {tasks.map((item, index) => (
                  <div key={item.id || index} className={`task-item ${item.completed ? 'completed' : ''}`}>
                    <div className="task-content">
                      <button
                        onClick={() => toggleComplete(index)}
                        className="checkbox-button"
                      >
                        {item.completed ? (
                          <FiCheckCircle className="check-icon checked" />
                        ) : (
                          <FiCircle className="check-icon" />
                        )}
                      </button>
                      <span className="task-text">
                        {item.text}
                      </span>
                    </div>
                    <div className="task-actions">
                      <button 
                        onClick={() => editTask(index)} 
                        className="action-button edit-button"
                        title="Edit task"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteTask(index)} 
                        className="action-button delete-button"
                        title="Delete task"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
