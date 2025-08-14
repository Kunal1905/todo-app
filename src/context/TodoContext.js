import { createContext, useContext } from "react";

export const TodoContext = createContext(); // no default value

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = TodoContext.Provider;
