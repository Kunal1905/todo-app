import React, { useState } from "react";
import { useTodo } from "../context";

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo, toggleTodo } = useTodo();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.todo);

  const save = () => {
    updateTodo(todo.id, { ...todo, todo: text });
    setEditing(false);
  };

  return (
    <li className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="form-checkbox h-5 w-5"
        />
        {editing ? (
          <input
            className="px-1"
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        ) : (
          <span className={`flex-grow ${todo.completed ? "line-through text-gray-400" : ""}`}>
            {todo.todo}
          </span>
        )}
      </div>
      <div className="flex-shrink-0 space-x-2">
        {editing ? (
          <button onClick={save} className="text-green-600">Save</button>
        ) : (
          <button onClick={() => setEditing(true)} className="text-blue-600">Edit</button>
        )}
        <button onClick={() => deleteTodo(todo.id)} className="text-red-600">Delete</button>
      </div>
    </li>
  );
}
