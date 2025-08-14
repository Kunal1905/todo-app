import React, { useState } from "react";
import { useTodo } from "../context";

export default function TodoForm() {
  const [text, setText] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo({ todo: text, completed: false });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add new task"
        className="flex-grow px-3 py-2 border rounded-lg focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Add
      </button>
    </form>
  );
}
