import React, { useState } from 'react';

interface TodoFormProps {
  addTodo: (title: string, description: string, duration: number) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(title, description, duration);
    setTitle('');
    setDescription('');
    setDuration(0);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <input
        type="number"
        placeholder="Duration (hours)"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
