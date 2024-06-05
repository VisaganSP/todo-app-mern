import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import "./assets/styles/App.css";

interface Todo {
  _id: string;
  title: string;
  description: string;
  duration: number;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (
    title: string,
    description: string,
    duration: number
  ) => {
    try {
      const response = await axios.post("http://localhost:3000/api/todos", {
        title,
        description,
        duration,
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (
    id: string,
    title: string,
    description: string,
    duration: number
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/todos/${id}`,
        {
          title,
          description,
          duration,
        }
      );
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const completeTodo = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/todos/${id}`,
        {
          completed: true,
        }
      );
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  return (
    <div className="app">
      <h1>Visagan's Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-lists">
        <div className="todo-list">
          <h2>Active Todos</h2>
          {todos
            .filter((todo) => !todo.completed)
            .map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onDelete={deleteTodo}
                onComplete={completeTodo}
                onUpdate={updateTodo}
              />
            ))}
        </div>
        <div className="todo-list completed-todos">
          <h2>Completed Todos</h2>
          {todos
            .filter((todo) => todo.completed)
            .map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onDelete={deleteTodo}
                onComplete={completeTodo}
                onUpdate={updateTodo}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
