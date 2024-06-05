import React, { useState } from "react";

interface TodoItemProps {
  todo: {
    _id: string;
    title: string;
    description: string;
    duration: number;
    completed: boolean;
  };
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onUpdate: (
    id: string,
    title: string,
    description: string,
    duration: number
  ) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onComplete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [duration, setDuration] = useState(todo.duration);

  const handleUpdate = () => {
    onUpdate(todo._id, title, description, duration);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="todo-edit-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="todo-content">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>Duration: {todo.duration} hours</p>
        </div>
      )}
      <div className="todo-actions">
        {!isEditing && !todo.completed && (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        {!todo.completed && (
          <button onClick={() => onComplete(todo._id)}>Complete</button>
        )}
        <button onClick={() => onDelete(todo._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
