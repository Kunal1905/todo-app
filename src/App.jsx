import { useState, useEffect} from "react";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";

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
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const newTask = prompt("Edit your task:", tasks[index].text);
    if (newTask !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = newTask;
      setTasks(updatedTasks);
    }
  };
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>iTask- Manage your todos at one place</h1>
        <h2>Add a Todo</h2>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={handleAddTask}>Save</button>

        

        <h2>Your Todos</h2>
        <ul>
          {tasks.map((item, index) => (
            <li key={index} className="todo-item">
              <div className="left">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
                />
                <span className={item.completed ? "completed" : ""}>
                  {item.text}
                </span>
              </div>
              <div className="right">
                <button onClick={() => editTask(index)}>Edit</button>

                <button onClick={() => deleteTask(index)}>Del</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
